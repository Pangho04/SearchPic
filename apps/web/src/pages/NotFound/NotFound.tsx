import { MainButton, TextLabel } from '@searchpic/ui';
import { useNavigate } from 'react-router-dom';
import { RootPath } from '@/router/Paths';

export default function NotFound() {
  const navigate = useNavigate();

  const handleClickMain = () => {
    navigate(RootPath);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#fafafa] p-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <TextLabel
          text="존재하지 않는 경로입니다."
          color="#111111"
          size="24px"
          weight="bold"
          align="center"
        />
        <MainButton
          text="메인으로 이동"
          styleTheme="primary"
          additionalClasses="w-full max-w-[335px]"
          onClick={handleClickMain}
        />
      </div>
    </div>
  );
}
