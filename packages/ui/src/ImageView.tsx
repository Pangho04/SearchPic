type Props = {
  src: string;
  width?: string | 'responsive';
  height?: string | 'responsive';
  alt?: string;
  radius?: 8 | 16 | 24;
  ratio?: '16:9' | '4:3' | '1:1' | '9:16' | '3:4' | '3:2' | 'auto';
  scaleType?: 'none' | 'cover' | 'contain' | 'fill';
  additionalContainerClasses?: string;
  additionalImageClasses?: string;
};

function ImageView({
  src,
  alt = '',
  width = 'responsive',
  height = 'responsive',
  radius = 8,
  ratio = 'auto',
  scaleType = 'none',
  additionalContainerClasses = '',
  additionalImageClasses = '',
}: Props) {
  const containerClasses = ['overflow-hidden', additionalContainerClasses]
    .filter(Boolean)
    .join(' ');
  const imageClasses = ['h-full w-full', additionalImageClasses].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    ...(width !== 'responsive' ? { width } : null),
    ...(height !== 'responsive' ? { height } : null),
    ...(radius !== undefined ? { borderRadius: `${radius}px` } : null),
    ...(ratio !== 'auto' ? { aspectRatio: ratio.replace(':', ' / ') } : null),
  };

  const imageStyle: React.CSSProperties = {
    ...(scaleType !== 'none' ? { objectFit: scaleType } : null),
  };

  return (
    <div className={containerClasses} style={containerStyle}>
      <img
        className={imageClasses}
        style={imageStyle}
        src={src}
        alt={alt}
        aria-hidden={alt === ''}
      />
    </div>
  );
}

export default ImageView;
