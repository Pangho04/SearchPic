import { tw } from './tw';

type Props = {
  text: string;
  size?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  whitespace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'break-keep';
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
    'break-keep': 'break-keep',
  } as const;
  const breakClass = breakClassMap[wordBreak ?? 'normal'] ?? 'break-normal';

  const whitespaceClassMap: Record<NonNullable<Props['whitespace']>, string> = {
    normal: 'whitespace-normal',
    nowrap: 'whitespace-nowrap',
    pre: 'whitespace-pre',
    'pre-line': 'whitespace-pre-line',
    'pre-wrap': 'whitespace-pre-wrap',
  };
  const whitespaceClass = whitespaceClassMap[whitespace];

  const weightClassMap: Record<NonNullable<Props['weight']>, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  const weightClass = weightClassMap[weight];

  const alignClassMap: Record<NonNullable<Props['align']>, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const alignClass = alignClassMap[align ?? 'center'];

  const baseStyles = tw`relative flex-1 font-sans ${alignClass} ${weightClass} text-[length:var(--text-label-size,15px)] text-[color:var(--text-label-color,#ffffff)] ${textSpacing} ${whitespaceClass} ${breakClass}`;

  const classes = [baseStyles, additionalClasses].filter(Boolean).join(' ');

  const colorValue = color.startsWith('#') ? color : `#${color}`;

  return (
    <div
      className={classes}
      style={
        {
          '--text-label-size': size,
          '--text-label-color': colorValue,
        } as React.CSSProperties
      }
    >
      {text}
    </div>
  );
}

export default TextLabel;
