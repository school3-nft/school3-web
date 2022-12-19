type Props = {
  children: any;
  className?: string;
  type?: "main" | "home";
};

export default function Overlay({ children, type, className }: Props) {
  switch (type) {
    case "home":
      return (
        <main className="grid grid-cols-[250px_1fr_1fr_1fr] mx-16 mt-8">
          <section className="col-span-1">{children[0]}</section>
          <section className="col-span-3">{children[1]}</section>
        </main>
      );
    case "main":
      return <main className={className}>{children}</main>;
    default:
      return (
        <main
          className={`h-full grid grid-cols-6 ${className ? className : ""}`}
        >
          <section className="col-span-1"></section>
          <section className="col-span-4 h-full">{children}</section>
          <section className="col-span-1"></section>
        </main>
      );
  }
}
