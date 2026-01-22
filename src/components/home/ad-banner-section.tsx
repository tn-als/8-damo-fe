import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import type { AdBanner } from "@/src/types/home";

interface AdBannerSectionProps {
    banner: AdBanner;
    className?: string;
}

export function AdBannerSection({ banner, className }: AdBannerSectionProps) {
    const content = (
        <div
            className={cn(
                "relative aspect-[16/5] w-full overflow-hidden rounded-xl bg-muted",
                className
            )}
        >
            {banner.imageUrl ? (
                <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 430px) 100vw, 430px"
                    priority
                />
            ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                    <span className="text-sm text-muted-foreground">
                        {banner.title}
                    </span>
                </div>
            )}
        </div>
    );

    if (banner.linkUrl) {
        return (
            <Link
                href={banner.linkUrl}
                target={
                    banner.linkUrl.startsWith("http") ? "_blank" : undefined
                }
                rel={
                    banner.linkUrl.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                }
                className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                {content}
            </Link>
        );
    }

    return content;
}
