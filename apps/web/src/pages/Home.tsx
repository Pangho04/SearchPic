import { MainButton, TextLabel } from '@searchpic/ui';
import { useNavigate } from 'react-router-dom';
import { STRINGS } from '@/common/constants';
import { Header, Footer } from '@/components';
import { ResultPath } from '@/router/Paths';

export default function Home() {
  const navigate = useNavigate();

  const homeStrings = STRINGS.home;

  const handleClickNextBtn = () => {
    navigate(ResultPath);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <TextLabel text={homeStrings.header.name} color="#1A1A1A" weight="medium" />
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
