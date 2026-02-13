  import { getAccessToken } from "@/src/lib/cookie";
  import { LightningSocketBoundary } from "@/src/components/lightning/lightning-socket-boundary";

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