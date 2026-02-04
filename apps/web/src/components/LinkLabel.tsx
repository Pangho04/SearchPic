import { TextLabel } from '@searchpic/ui';
import { Link } from 'react-router-dom';

function LinkLabel({
  href,
  text,
  color,
  weight,
  align,
  additionalClasses,
}: {
  href?: string;
  text: string;
  color: string;
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
  align: 'left' | 'center' | 'right';
  additionalClasses: string;
}) {
  if (!href) {
    return (
      <TextLabel
        text={text}
        color={color}
        weight={weight}
        align={align}
        additionalClasses={additionalClasses}
      />
    );
  }

  return (
    <Link to={href} target="_blank" rel="noreferrer" className="w-full">
      <TextLabel
        text={text}
        color={color}
        weight={weight}
        align={align}
        additionalClasses={`${additionalClasses} underline`}
        wordBreak="break-word"
      />
    </Link>
  );
}

export default LinkLabel;
