export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="divider">本篇完</div>
    </>
  );
}
