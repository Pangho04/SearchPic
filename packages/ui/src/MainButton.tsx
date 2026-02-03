import { tw } from './tw';

type StyleTheme = 'primary' | 'secondary';

type Props = {
  text: string;
  styleTheme?: StyleTheme;
  additionalClasses?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const baseStyles = tw`relative flex w-full flex-row items-center justify-center gap-1.5 rounded-xl p-3 text-center text-base font-semibold leading-[148%] tracking-[-0.02em] disabled:cursor-not-allowed disabled:opacity-50 md:w-[335px] lg:text-2xl`;

const variantStyles: Record<StyleTheme, string> = {
  primary: tw`bg-[#111111] text-[#ffffff] hover:bg-[rgba(17,17,17,0.80)] active:bg-[rgba(17,17,17,0.80)]`,
  secondary: tw`border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#ffffff] active:bg-[#111111] active:text-[#ffffff]`,
};

function MainButton({
  text,
  styleTheme = 'primary',
  additionalClasses = '',
  disabled = false,
  onClick,
  onMouseDown,
}: Props) {
  const classes = [baseStyles, variantStyles[styleTheme], additionalClasses]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default MainButton;
