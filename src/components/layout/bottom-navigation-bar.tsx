"use client";

import { Home, Users, Zap, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import type { NavigationItem } from "@/src/types/home";

const navigationItems: NavigationItem[] = [
    {
        id: "home",
        label: "홈",
        href: "/",
    },
    {
        id: "groups",
        label: "그룹",
        href: "/groups",
    },
    {
        id: "lightning",
        label: "번개",
        href: "/lightning",
        disabled: true,
    },
    {
        id: "mypage",
        label: "마이",
        href: "/mypage",
        disabled: true,
    },
];

const iconMap: Record<string, typeof Home> = {
    home: Home,
    groups: Users,
    lightning: Zap,
    mypage: User,
};

export function BottomNavigationBar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
            <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2 sm:h-18">
                {navigationItems.map((item) => {
                    const Icon = iconMap[item.id];
                    const active = isActive(item.href);

                    if (item.disabled) {
                        return (
                            <div
                                key={item.id}
                                className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground/50"
                            >
                                <Icon className="size-5 sm:size-6" />
                                <span className="text-xs sm:text-sm">
                                    {item.label}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="size-5 sm:size-6" />
                            <span className="text-xs sm:text-sm">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
