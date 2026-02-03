type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header
      className="flex flex-row items-center justify-center self-stretch shrink-0 relative overflow-hidden font-sans font-medium h-[52px] py-[17px] px-[20px]"
      role="banner"
    >
      <div className="relative flex-1 text-center font-sans font-medium text-[15px] leading-[1.4] tracking-[-0.02em]">
        {children}
      </div>
    </header>
  );
}
