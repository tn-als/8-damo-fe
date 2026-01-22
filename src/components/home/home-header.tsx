import { cn } from "@/src/lib/utils";
import { Header } from "../layout";

interface HomeHeaderProps {
    appName: string;
}

export function HomeHeader({ appName }: HomeHeaderProps) {
    return (
        <Header
            title={appName}
            showBackButton={false}
        />
    );
}
