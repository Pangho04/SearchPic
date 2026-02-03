type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header
      className="relative flex h-[52px] shrink-0 flex-row items-center justify-center self-stretch overflow-hidden px-[20px] py-[17px] font-sans font-medium"
      role="banner"
    >
      {children}
    </header>
  );
}
