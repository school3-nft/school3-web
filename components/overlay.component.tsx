type Props = {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  type?: "main";
};

export default function Overlay({ children, type, className }: Props) {
  switch (type) {
    case "main":
      return (
        <main data-testid="overlay-main" className={className}>
          {children}
        </main>
      );
    default:
      return (
        <main
          data-testid="overlay-default"
          className={`grid grid-cols-6 ${className ? className : ""}`}
        >
          <section className="col-span-1"></section>
          <section className="col-span-4">{children}</section>
          <section className="col-span-1"></section>
        </main>
      );
  }
}
