import { LightningSocketBoundary } from "@/src/components/lightning";
import { getAccessToken } from "@/src/lib/cookie";

interface LightningLayoutProps {
  children: React.ReactNode;
}

export default async function LightningLayout({ children }: LightningLayoutProps) {
  const accessToken = await getAccessToken();

  return (
    <LightningSocketBoundary accessToken={accessToken}>
      {children}
    </LightningSocketBoundary>
  );
}
