# 📷 SearchPic

## 목차

- [1. 프로젝트 개요](#1-프로젝트-개요)
  - [Ⅰ. 주요 특징](#ⅰ-주요-특징)
  - [Ⅱ. 라우트 구조](#ⅱ-라우트-구조)
- [2. 실행 방법](#2-실행-방법)
- [3. 기술 스택](#3-기술-스택)
  - [기술 스택 선정 이유](#기술-스택-선정-이유)
- [4. 프로젝트 구조 (Turbo Monorepo)](#4-프로젝트-구조-turbo-monorepo)
- [5. 구현 체크리스트](#5-구현-체크리스트)
  - [공통](#공통)
  - [Ⅰ. Web](#ⅰ-web)
  - [Ⅱ. Storybook](#ⅱ-storybook)
  - [Ⅲ. @searchpic/ui](#ⅲ-searchpicui)
- [6. 주요 기능 구현 로직](#6-주요-기능-구현-로직)
  - [Ⅰ. 조회 결과 동기화 (React Query → Zustand)](#sync-react-query-zustand)
  - [Ⅱ. 새로고침 시 상태 유지 (IndexedDB Persist)](#persist-indexeddb)
  - [Ⅲ. Home “다음” 버튼 스로틀 처리](#ⅲ-home-다음-버튼-스로틀-처리)
  - [Ⅳ. 조회 이력 기반 라우트 가드](#ⅳ-조회-이력-기반-라우트-가드)
  - [Ⅴ. API 응답 이미지 기반 페이지 배경 (MaskLayer)](#ⅴ-api-응답-이미지-기반-페이지-배경-masklayer)
  - [Ⅵ. 전역 얼럿 & 404 처리](#ⅵ-전역-얼럿--404-처리)
  - [Ⅶ. Storybook 기반 UI 검증](#ⅶ-storybook-기반-ui-검증)
  - [Ⅷ. 공통 UI 패키지 `@searchpic/ui`](#ⅷ-공통-ui-패키지-searchpicui)
- [7. 마무리](#7-마무리)

---

## 1. 프로젝트 개요

Picsum Photos API를 활용해 사진 정보를 조회하고, 조회 결과를 `/result` 페이지에 표시하는 웹 애플리케이션입니다.  
Turbo 레포 기반의 모노레포로 구성되어 있으며, **web**과 **storybook** 두 워크스페이스를 포함합니다.

### Ⅰ. 주요 특징

- **Turbo Monorepo**: pnpm 워크스페이스와 Turborepo를 사용한 모노레포 구조
- **공통 UI 패키지**: `@searchpic/ui` 패키지에 MainButton, TextLabel, ImageView 등 재사용 컴포넌트 제공
- **사진 조회 플로우**: 메인(`/`)에서 "다음" 버튼 클릭 시 Picsum API 호출 후 `/result`로 이동
- **상태 유지**: TanStack Query + IndexedDB Persister로 새로 고침 시에도 조회 데이터 유지
- **전역 상태**: Zustand로 조회 결과를 전역 관리하여 라우트 간 데이터 전달

### Ⅱ. 라우트 구조

| 경로      | 설명                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| `/`       | 메인(Home) 페이지. 사진 조회 전 진입 페이지. "다음" 버튼 클릭 시 사진 조회 후 `/result`로 이동 |
| `/result` | 사진 조회 결과 페이지. API 응답 기반 UI 렌더링                                                 |
| `/404`    | 존재하지 않는 경로 접근 시 노출되는 NotFound 페이지                                            |

---

## 2. 실행 방법

**환경**

- Node.js: v24 이상 (`.nvmrc` 참고)
- 패키지 매니저: **pnpm** v10.4.0

```bash
# 1. 저장소 복제
git clone https://github.com/<your-username>/SearchPic.git
cd SearchPic

# 2. 의존성 설치
pnpm install

# 3. 개발 서버 실행 (web + storybook 동시 실행)
pnpm dev

# 4. web만 실행
pnpm --filter web dev

# 5. storybook만 실행
pnpm --filter storybook dev

# 6. 프로덕션 빌드 및 린트
pnpm build
pnpm lint

# 7. 포맷 검사 및 자동 수정
pnpm format:check
pnpm format
```

**환경 변수 (apps/web)**

- `VITE_API_BASE_URL`: Picsum API 베이스 URL

---

## 3. 기술 스택

| 구분        | 기술                                            |
| ----------- | ----------------------------------------------- |
| Monorepo    | Turborepo, pnpm workspace                       |
| Framework   | React 19, TypeScript                            |
| Build       | Vite 6                                          |
| Routing     | React Router v7                                 |
| API 상태    | TanStack Query (React Query)                    |
| 전역 상태   | Zustand                                         |
| 스타일      | Tailwind CSS 4, DaisyUI                         |
| UI 패키지   | `@searchpic/ui` (Tailwind, tw 유틸)             |
| Persistence | @tanstack/react-query-persist-client, IndexedDB |
| 코드 품질   | ESLint (Airbnb), Prettier, Husky + lint-staged  |
| 스토리북    | Storybook 8 (Vite)                              |

### 기술 스택 선정 이유

- **Turborepo & pnpm workspace**  
  web과 storybook을 하나의 레포에서 관리하고, Turborepo의 빌드 캐시와 태스크 파이프라인으로 개발·빌드 효율을 높이기 위해 선정했습니다.

- **React 19 & TypeScript**  
  컴포넌트 기반 UI 구축과 정적 타이핑으로 런타임 오류를 줄이고 유지보수성을 높이기 위해 선정했습니다.

- **TanStack Query (React Query)**  
  서버 상태(API 응답) 관리와 캐싱·리페칭을 일원화해, Picsum API 조회 로직을 단순화하고 로딩·에러 상태를 일관되게 다루기 위해 도입했습니다.

- **Zustand**  
  경량 전역 상태로 조회 결과를 저장해 라우트 간 데이터 전달과 Result 페이지 구독을 쉽게 하기 위해 사용했습니다. TanStack Query와 역할을 나누어(API 캐시 vs 화면 간 공유) 적용했습니다.

- **Tailwind CSS 4 & DaisyUI**  
  유틸리티 퍼스트로 빠르게 스타일을 적용하고, DaisyUI로 버튼·카드·스켈레톤 등 일관된 컴포넌트를 쓰기 위해 선정했습니다.

- **TanStack Query Persist (IndexedDB)**  
  새로 고침 후에도 사진 조회 결과를 유지해 사용자 경험을 높이기 위해, 클라이언트 저장소로 IndexedDB 기반 Persister를 사용했습니다.

- **ESLint (Airbnb), Prettier, Husky + lint-staged**  
  코드 스타일과 품질을 통일하고, 커밋 전에 자동으로 검사해 일관된 코드베이스를 유지하기 위해 적용했습니다.

- **Storybook 8 (Vite)**  
  `@searchpic/ui` 컴포넌트를 라우트·API와 분리해 독립적으로 개발·문서화하고, 상태별(Default, Hover, Disabled 등) 시나리오를 검증하기 위해 사용했습니다.

---

## 4. 프로젝트 구조 (Turbo Monorepo)

```
SearchPic/
├── apps/
│   ├── web/                    # 메인 웹 앱 (Vite + React)
│   │   ├── src/
│   │   ├── common/         # 상수, API, Query, Store(Zustand), Provider
│   │   ├── components/     # Alert, Footer, Header, LinkLabel
│   │   ├── pages/          # Home, Result, NotFound
│   │   ├── router/         # Paths, RouteContainer
│   │   └── App.tsx, main.tsx
│   │
│   └── storybook/              # UI 컴포넌트 스토리북
│       ├── src/
│       ├── MainButton.stories.tsx
│       ├── TextLabel.stories.tsx
│       └── ImageView.stories.tsx
│
├── packages/
│   └── ui/                     # @searchpic/ui 공통 UI 패키지
│       ├── src/
│       ├── MainButton.tsx   # primary/secondary, loading
│       ├── TextLabel.tsx
│       ├── ImageView.tsx
│       ├── styles.css
│       └── index.ts
```

---

## 5. 구현 체크리스트

### 공통

- [x] 워크스페이스 2개 구성 (web, storybook)

### Ⅰ. Web

- [x] 기획 사항에 따른 반응형 디자인 구현
- [x] 라우팅 구조 구현
  - 사진 조회 전 경로: `/`
  - 사진 조회 후 경로: `/result`
- [x] Picsum API 조회 후 Zustand 전역 상태 업데이트
- [x] 새로고침 시에도 API 응답 유지
  - TanStack Query Persist (IndexedDB)
- [x] "다음" 버튼 클릭 시 스로틀(500ms) 적용
  - 스로틀 중에는 `MainButton`의 Loading UI 표시
- [x] Result 페이지에서 상태 구독으로 UI 표시
- [x] API 요청 중, Result 페이지에서 스켈레톤 UI 표시.
- [x] 사진 조회 이력이 있으면 Home 페이지 접근 시 Result 페이지로 리다이렉트
- [x] 사진 조회 이력 없이 Result 페이지 접근 시, 1초 후 Home 페이지로 이동
- [x] 존재하지 않는 경로 접근 시, 404 페이지로 이동

### Ⅱ. Storybook

- [x] `MainButton` 상태별 스토리 작성
  - Default, Hover, Clicked, Disabled 등
- [x] `ImageView` 스토리 작성
- [x] `TextLabel` 스토리 작성

### Ⅲ. @searchpic/ui

- [x] 공용 Button UI 컴포넌트 구현 (`MainButton`)
- [x] 공용 Image UI 컴포넌트 구현 (`ImageView`)
- [x] 공용 Text UI 컴포넌트 구현 (`TextLabel`)

---

## 6. 주요 기능 구현 로직

### Ⅰ. 조회 결과 동기화 (React Query → Zustand)

<a id="sync-react-query-zustand"></a>

- React Query가 서버 상태를 캐싱하고, Zustand가 화면 간 공유를 담당합니다.
- `queryKey` 변화에 반응해 캐시 데이터를 읽어, Zustand 전역 상태를 업데이트하여 즉시 반영합니다.
- 프리패치·캐시 복원·재조회로 데이터가 갱신될 때마다, 모두 React Query 캐시 → Query 훅 → Zustand 전역 상태 순서로 동일한 경로를 타도록 구성해 UI 일관성을 유지합니다.

### Ⅱ. 새로고침 시 상태 유지 (IndexedDB Persist)

<a id="persist-indexeddb"></a>

- `PersistQueryClientProvider`와 IndexedDB persister로 Query 캐시를 영속화합니다.
- 최초 진입 시 `PersistQueryClientProvider`의 `onSuccess`에서 복원된 캐시를 한 번 읽어 전역 상태로 주입하고,
  이후에는 전역 상태 구독만으로 Result 페이지를 이어서 표시합니다.

### Ⅲ. Home “다음” 버튼 스로틀 처리

- 500ms 스로틀을 통해 짧은 시간 내 중복 클릭으로 인한 중복 API 요청을 방지합니다.
- 스로틀 구간 동안 버튼에는 로딩 스피너가 표시되고 비활성(disabled) 상태가 유지되며, 타이머 만료 시 로딩/비활성 상태를 해제합니다.
- 화면이 언마운트될 때 남아 있는 스로틀 타이머는 정리해 메모리 누수와 의도치 않은 후속 호출을 방지합니다.

### Ⅳ. 조회 이력 기반 라우트 가드

- 전역 상태에 조회 결과가 이미 저장된 경우, Home 페이지 진입 시 Result 페이지로 자동 이동해 불필요한 초기 페이지 노출을 줄입니다.
- 사용자가 URL로 `/result`에 직접 진입하면, 먼저 Persist된 React Query 캐시를 복원한 뒤 해당 값이 전역 상태에 동기화되어 있는지를 기준으로 조회 이력 유무를 판별합니다.
- 전역 상태에 조회 결과가 없고 React Query에서도 성공/에러 상태가 아닌 경우, 조회 이력이 없는 것으로 판단해 안내 후 1초 뒤 Home 페이지로 리다이렉트합니다.
- 안내/타이머는 cleanup에서 정리해 이탈·재진입 시 중복 실행을 차단합니다.

### Ⅴ. API 응답 이미지 기반 페이지 배경 (MaskLayer)

- API 응답에 포함된 이미지 URL을 MaskLayer의 `imageSrc`로 주입해 블러 처리된 배경을 구성함으로써, 상세 정보가 실제 조회한 이미지 컨텍스트 위에 렌더링되도록 했습니다.

### Ⅵ. 전역 얼럿 & 404 처리

- `AlertProvider`로 공통 얼럿 모달을 제공하며, Result 페이지에 조회 이력 없이 진입한 경우 “조회 이력이 없음” 안내 얼럿을 노출한 뒤 홈으로 리다이렉트합니다.
- 조회 API 호출이 실패한 경우, 에러 메시지를 포함한 얼럿과 함께 “메인으로 돌아가기” 액션 버튼을 제공해 사용자가 복구 경로를 명확히 인지할 수 있도록 했습니다.
- 정의되지 않은 경로는 라우팅 단계에서 `/404`로 일괄 리다이렉트하며, 404 페이지에서는 `MainButton`을 통해 메인(Home)으로 이동할 수 있는 액션을 제공합니다.

### Ⅶ. Storybook 기반 UI 검증

- `@searchpic/ui`의 `MainButton`, `TextLabel`, `ImageView`에 대해 Storybook 스토리를 작성해 상태별 UI를 독립적으로 검증합니다.
- `MainButton`은 기본, Hover, Clicked, Disabled, Loading 등 버튼 상태를 스토리로 분리해 인터랙션과 시각적 일관성을 점검했습니다.
- 페이지 로직과 분리된 환경에서 컴포넌트를 시각적으로 확인할 수 있어, 디자인 수정 후 예상치 못한 UI 깨짐을 빠르게 발견할 수 있습니다.

### Ⅷ. 공통 UI 패키지 `@searchpic/ui`

- 버튼, 텍스트, 이미지 컴포넌트를 별도 패키지(`@searchpic/ui`)로 분리해 web 앱과 Storybook에서 공통으로 사용합니다.
- `MainButton`은 StyleTheme, Loading, Disabled 상태를 지원해 주요 액션 버튼을 일관된 규격으로 제공합니다.
- `TextLabel`은 색상, 크기, 정렬 등 텍스트 스타일을 캡슐화하고, `ImageView`는 비율·크기·라운드·object-fit을 Prop으로 제어할 수 있도록 설계했습니다.
- 공통 UI를 패키지 단위로 관리하여, 디자인/인터랙션 변경 시 단일 소스에서 수정이 반영되도록 했습니다.

---

## 7. 마무리

이번 SearchPic 프로젝트를 통해 간단한 사진 조회 과제를 넘어서,<br/>
**서버 상태 관리(TanStack Query)와 전역 상태(Zustand), 영속성(IndexedDB Persist)** 을 조합하여<br/>
사용자가 새로고침·재방문을 하더라도 자연스럽게 흐름을 이어갈 수 있는 경험을 설계했습니다. <br/>

특히 조회 결과를 React Query 캐시와 전역 상태 사이에서 자동으로 동기화하고, `/result` 라우트 가드를 통해 “조회 이력 유무”에 따른 분기 처리를 명확히 한 점이 인상적이었습니다. <br/>

또한 Home 페이지의 스로틀 처리, Result 페이지의 MaskLayer 배경, 스켈레톤 UI 등<br/>
**인터랙션·로딩 상태·시각적 피드백**을 세심하게 다듬어, 단순한 API 뷰어가 아닌 완성도 있는 단일 플로우를 구현하고자 했습니다. <br/>

공통 UI 패키지(`@searchpic/ui`)와 Storybook을 도입해 버튼·텍스트·이미지 컴포넌트를 재사용 가능한 형태로 추상화하고,<br/>
페이지 로직과 분리된 환경에서 상태별 UI를 검증할 수 있었던 점도 큰 수확이었습니다. <br/>

이번 구현을 통해 “작은 과제”에서도 **데이터 흐름 설계, 상태 관리 계층 분리, UI 컴포넌트 재사용성**을 의식하며 작업하는 것이 얼마나 중요한지 다시 한 번 체감했습니다.<br/>

긴 글 읽어주셔서 감사합니다.
