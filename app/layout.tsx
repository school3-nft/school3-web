export default function BlogLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="h-full grid grid-rows-[80px_1fr] bg-background">
      <Header />
      <main>{children}</main>
    </div>
  );
}
