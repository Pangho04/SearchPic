import { MainButton, TextLabel } from '@searchpic/ui';
import { SCENE_STRINGS } from '@/common/constants';
import { Header, Footer } from '@/components';
import { ResultPath } from '@/router/Paths';
import useSearchResultQuery from '@/common/services/query/useSearchResultQuery';

export default function Home() {
  const navigate = useNavigate();
  const { refetch } = useSearchResultQuery({ enabled: false });

  const homeStrings = SCENE_STRINGS.home;

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
