import { MainButton } from '@searchpic/ui';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Result() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header>지원자분 성함을 적어주세요</Header>
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="mb-6 text-3xl font-bold">결과</h1>
        <MainButton styleTheme="secondary" onClick={() => navigate('/')}>
          메인으로
        </MainButton>
      </main>
    </div>
  );
}
