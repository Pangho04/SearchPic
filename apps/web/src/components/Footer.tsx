export type Props = {
  children: React.ReactNode;
};

function Footer({ children }: Props) {
  return (
    <footer className="relative flex shrink-0 flex-col items-center justify-center gap-2.5 self-stretch pb-10 pl-5 pr-5 pt-10">
      {children}
    </footer>
  );
}

export default Footer;
