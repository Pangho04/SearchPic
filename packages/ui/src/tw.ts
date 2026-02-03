/**
 * @description Tailwind 클래스 문자열 정렬을 위한 태그드 템플릿입니다.
 * Prettier의 tailwindFunctions에 등록하여, prettier가 인식하여 정렬할 수 있습니다.
 */
export function tw(strings: TemplateStringsArray, ...values: unknown[]): string {
  return values.length === 0 ? strings[0] : String.raw({ raw: strings }, ...values);
}
