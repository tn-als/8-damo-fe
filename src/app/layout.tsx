import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import localFont from 'next/font/local';
import { UserProvider } from "@/src/components/providers/UserProvider";
import { RouteGuard } from "@/src/components/guards/RouteGuard";
import { QueryProvider } from "@/src/components/providers/query-provider";

const pretendard = localFont({
  src: 'fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: "다모",
  description: "인원 · 예산 · 취향 한 번에 고려해서 회식 장소 바로 추천",
  viewport: {
    width: "device-width",
    initialScale: 1, 
    maximumScale: 1
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="--font-pretendard antialiased bg-background">
        <QueryProvider>
          <UserProvider>
            <RouteGuard>
              {children}
            </RouteGuard>
          </UserProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
