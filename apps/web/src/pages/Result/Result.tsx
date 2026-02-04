import { ImageView, MainButton, TextLabel } from '@searchpic/ui';
import { useNavigate } from 'react-router-dom';
import { SCENE_STRINGS } from '@/common/constants';
import { RootPath } from '@/router/Paths';

import { Header, LinkLabel } from '@/components';
import { tw } from '@/tw';
import { useStore } from '@/common/store';
import useSearchResultQuery from '@/common/services/query/useSearchResultQuery';
import MaskLayer from './components/MaskLayer';

const formatNumber = (n: number | undefined) => {
  if (n === undefined || Number.isNaN(n)) return '-';

  return n.toLocaleString();
};

export default function Result() {
  const navigate = useNavigate();

  const searchResult = useStore((state) => state.searchResult);
  const { isLoading } = useSearchResultQuery();

  const resultStrings = SCENE_STRINGS.result;

  const cardClassName = tw`flex flex-col gap-4 self-stretch rounded-2xl border border-solid border-[rgba(0,0,0,0.01)] bg-[#ffffff] p-5 md:relative md:shrink-0 md:flex-row`;
  const fieldClassName = tw`md: flex flex-1 flex-col items-start gap-0 self-stretch`;

  const labelProps = {
    color: '#111111',
    weight: 'medium' as const,
    align: 'left' as const,
    additionalClasses: 'flex-none',
  };

  const valueProps = {
    ...labelProps,
    additionalClasses: 'flex-none opacity-50',
  };

  const cardGroups: {
    id: string;
    fields: Array<
      | { label: string; value: string; isLink: false }
      | { label: string; value: string; href?: string; isLink: true }
    >;
  }[] = [
    {
      id: 'basic',
      fields: [
        { label: 'id', value: searchResult?.id ?? '-', isLink: false },
        { label: 'author', value: searchResult?.author ?? '-', isLink: false },
      ],
    },
    {
      id: 'size',
      fields: [
        { label: 'width', value: formatNumber(searchResult?.width), isLink: false },
        { label: 'height', value: formatNumber(searchResult?.height), isLink: false },
      ],
    },
    {
      id: 'links',
      fields: [
        {
          label: 'url',
          value: searchResult?.url ?? '-',
          href: searchResult?.url,
          isLink: true,
        },
        {
          label: 'download_url',
          value: searchResult?.download_url ?? '-',
          href: searchResult?.download_url,
          isLink: true,
        },
      ],
    },
  ];

  const handleClickPrevBtn = () => {
    navigate(RootPath);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start gap-10 overflow-hidden bg-[#fafafa] pb-[60px]">
      {/* 배경 이미지 */}
      <MaskLayer imageSrc={searchResult?.download_url ?? ''} />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start gap-10 lg:min-h-0">
        <Header>
          <TextLabel text={resultStrings.header.content} color="#ffffff" weight="medium" />
        </Header>

        <div className="flex w-full flex-1 flex-col items-stretch justify-start gap-10 lg:min-h-0 lg:flex-row lg:items-center">
          {/** 이미지 영역 */}
          <div className="aspect-3/2 relative flex h-full shrink-0 flex-col items-start justify-start gap-2.5 overflow-hidden px-5 lg:flex-1">
            {isLoading ? (
              <div className="skeleton h-full w-full shrink-0 self-stretch rounded-3xl" />
            ) : (
              <ImageView
                src={searchResult?.download_url ?? ''}
                alt="result-image"
                width="responsive"
                height="responsive"
                radius={24}
                scaleType="cover"
                ratio="3:2"
                additionalContainerClasses="w-full max-h-full shrink-0 self-stretch"
                additionalImageClasses="h-full w-full object-cover"
              />
            )}
          </div>

          {/** 정보 카드 영역 */}
          <div className="relative flex min-h-0 flex-1 flex-col items-start justify-start gap-[60px] px-5 lg:items-center lg:justify-center">
            <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-3 self-stretch">
              {isLoading
                ? [1, 2, 3].map((cardIdx) => (
                    <div
                      key={cardIdx}
                      className={cardClassName}
                      style={{
                        flexDirection: cardIdx === 3 ? 'column' : undefined,
                      }}
                    >
                      {[1, 2].map((fieldIdx) => (
                        <div key={fieldIdx} className={fieldClassName}>
                          <div className="skeleton h-4 w-12 shrink-0 rounded" />
                          <div className="skeleton h-4 w-24 shrink-0 rounded opacity-50" />
                        </div>
                      ))}
                    </div>
                  ))
                : cardGroups.map((card) => (
                    <div
                      key={card.id}
                      className={cardClassName}
                      style={{
                        flexDirection: card.id === 'links' ? 'column' : undefined,
                      }}
                    >
                      {card.fields.map((field) => (
                        <div key={field.label} className={fieldClassName}>
                          <TextLabel text={field.label} {...labelProps} />
                          {field.isLink ? (
                            <LinkLabel
                              href={'href' in field ? field.href : undefined}
                              text={field.value}
                              {...valueProps}
                            />
                          ) : (
                            <TextLabel text={field.value} {...valueProps} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
              <MainButton
                text={resultStrings.buttonText}
                styleTheme="primary"
                additionalClasses="w-full lg:text-base md:w-[154px]"
                onClick={handleClickPrevBtn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
