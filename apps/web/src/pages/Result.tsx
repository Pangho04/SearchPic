import { MainButton, TextLabel } from '@searchpic/ui';
import { useNavigate } from 'react-router-dom';
import { STRINGS } from '@/common/constants';
import { RootPath } from '@/router/Paths';
import Header from '../components/Header';

export default function Result() {
  const navigate = useNavigate();

  const resultStrings = STRINGS.result;

  const handleClickPrevBtn = () => {
    navigate(RootPath);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <TextLabel text={resultStrings.header.content} color="#1A1A1A" weight="medium" />
      </Header>
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="mb-6 text-3xl font-bold">결과</h1>
        <MainButton
          text={resultStrings.buttonText}
          styleTheme="secondary"
          onClick={handleClickPrevBtn}
        />
      </main>
    </div>
  );
}
