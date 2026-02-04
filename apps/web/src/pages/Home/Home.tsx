import { MainButton, TextLabel } from '@searchpic/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SCENE_STRINGS } from '@/common/constants';
import { Header, Footer } from '@/components';
import { ResultPath } from '@/router/Paths';
import { useStore } from '@/common/store';
import useSearchResultQuery from '@/common/services/query/useSearchResultQuery';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResult = useStore((state) => state.searchResult);
  const { refetch } = useSearchResultQuery({ enabled: false });

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

  const handleClickNextBtn = () => {
    refetch();
    navigate(ResultPath, { state: { fromHomeClick: true } });
  };

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
        <MainButton text={homeStrings.footer.buttonText} onClick={handleClickNextBtn} />
      </Footer>
    </div>
  );
}
