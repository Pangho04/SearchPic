import { ImageView } from '@searchpic/ui';
import noiseLayerSrc from '@/common/assets/NoiseLayer.png';

type Props = {
  imageSrc: string;
  className?: string;
};

export default function MaskLayer({ imageSrc, className = '' }: Props) {
  return (
    <div
      className={[
        // 기본(모바일) 옵션
        'pointer-events-none absolute left-[-7px] top-0 z-0 h-[654px] w-[calc(100%+7px)] shrink-0 overflow-visible',
        // Tab 반응형 옵션
        'md:top-[-242.9px] md:h-[1271.79px]',
        // Desktop 반응형 옵션
        'lg:left-[-35px] lg:top-[-717.36px] lg:h-[2420.51px] lg:w-[calc(100%+35px)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(217,217,217,1) 0%, rgba(217,217,217,0) 100%)',
          maskImage: 'linear-gradient(180deg, rgba(217,217,217,1) 0%, rgba(217,217,217,0) 100%)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        {/* NoiseLayer */}
        <div
          className="absolute left-0 top-0 z-0 w-full"
          style={{
            background: 'linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))',
          }}
        >
          <ImageView
            src={noiseLayerSrc}
            alt=""
            width="responsive"
            height="responsive"
            scaleType="cover"
            ratio="3:2"
            additionalContainerClasses="h-[2612.59px] w-full"
            additionalImageClasses="object-cover"
          />
        </div>

        {/* Content Image */}
        <ImageView
          src={imageSrc}
          alt=""
          width="responsive"
          height="responsive"
          scaleType="cover"
          ratio="3:2"
          additionalContainerClasses="absolute left-0 top-0 z-[1] w-full h-[1301.19px] md:h-[1301.19px] lg:h-[2476.46px]"
          additionalImageClasses="opacity-30 blur-[10.9px] lg:blur-[20.75px]"
        />
      </div>
    </div>
  );
}
