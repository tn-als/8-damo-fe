import { BottomNavigationBar } from "@/src/components/layout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto pb-8">{children}</main>

      {/* 고정 하단 네비 */}
      <BottomNavigationBar />
    </div>
  );
}
