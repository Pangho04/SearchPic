import { MainButton, TextLabel } from '@searchpic/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { SCENE_STRINGS } from '@/common/constants';
import { Header, Footer } from '@/components';
import { ResultPath } from '@/router/Paths';
import { useStore } from '@/common/store';
import useSearchResultQuery from '@/common/services/query/useSearchResultQuery';

const THROTTLE_MS = 500;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResult = useStore((state) => state.searchResult);
  const { refetch } = useSearchResultQuery({ enabled: false });

  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const homeStrings = SCENE_STRINGS.home;

  /**
   * @when 화면 진입 시
   * @expect 검색 결과가 존재할 경우, 결과 페이지로 이동합니다.
   * @clear -
   */
  useEffect(() => {
    if (searchResult && location.state?.prevPath !== 'result') {
      navigate(ResultPath);
    }
  }, [navigate, searchResult, location.state?.prevPath]);

  useEffect(
    () => () => {
      if (throttleTimeoutRef.current != null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    },
    []
  );

  const handleClickNextBtn = () => {
    if (isThrottled) return;

    setIsThrottled(true);

    // Throttle UI 표시를 위해 지연 시간을 항상 기다립니다.
    throttleTimeoutRef.current = setTimeout(() => {
      refetch();
      navigate(ResultPath, { state: { fromHomeClick: true } });

      setIsThrottled(false);
      throttleTimeoutRef.current = null;
    }, THROTTLE_MS);
  };

  const buttonAdditionalClasses = 'w-full lg:text-base md:w-[335px]';

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <TextLabel text={homeStrings.header.content} color="#1A1A1A" weight="medium" />
      </Header>
      <main className="relative flex flex-1 flex-row items-center justify-center gap-2.5 self-stretch p-2.5">
        <TextLabel
          text={homeStrings.main.content}
          color="#111111"
          size="28px"
          weight="semibold"
          additionalClasses="lg:text-[32px]"
        />
      </main>
      <Footer>
        <MainButton
          text={homeStrings.footer.buttonText}
          loading={isThrottled}
          disabled={isThrottled}
          onClick={handleClickNextBtn}
          additionalClasses={buttonAdditionalClasses}
        />
      </Footer>
    </div>
  );
}
