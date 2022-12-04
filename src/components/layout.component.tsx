import Header from "./header.component";

export default function HomeLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="h-full grid grid-rows-[80px_1fr]">
      <Header />
      <main>{children}</main>
    </div>
  );
}
