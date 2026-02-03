import { tw } from './tw';

type Props = {
  text: string;
  size?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  whitespace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
  wordBreak?: 'normal' | 'break-all' | 'break-word';
  additionalClasses?: string;
};

function TextLabel({
  text,
  size = '15px',
  weight = 'normal',
  color = 'ffffff',
  align = 'center',
  whitespace = 'pre-line',
  wordBreak = 'normal',
  additionalClasses = '',
}: Props) {
  const textSpacing = tw`leading-[1.4] tracking-[-0.02em]`;

  const breakClassMap = {
    normal: 'break-normal',
    'break-all': 'break-all',
    'break-word': 'break-words',
  } as const;
  const breakClass = breakClassMap[wordBreak] ?? 'break-normal';

  const whitespaceClassMap: Record<NonNullable<Props['whitespace']>, string> = {
    normal: 'whitespace-normal',
    nowrap: 'whitespace-nowrap',
    pre: 'whitespace-pre',
    'pre-line': 'whitespace-pre-line',
    'pre-wrap': 'whitespace-pre-wrap',
  };
  const whitespaceClass = whitespaceClassMap[whitespace];

  const baseStyles = tw`relative flex-1 font-sans text-${align} text-[${size}] font-${weight} ${textSpacing} text-[${color}] ${whitespaceClass} ${breakClass}`;

  const classes = [baseStyles, additionalClasses].filter(Boolean).join(' ');

  return <div className={classes}>{text}</div>;
}

export default TextLabel;
