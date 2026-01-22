"use client"

import { Button } from "@/src/components/ui/button";

function KakaoSymbol({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.82 5.3 4.54 6.7-.14.86-.54 3.1-.62 3.58-.1.6.22.6.46.43.19-.13 2.96-2 4.18-2.8.47.05.95.09 1.44.09 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z"/>
        </svg>
    );
}

export function LoginButton(){
    const handleLogin = () => {
        // TODO: Implement OAuth login
        console.log("Login clicked");
    };

    return (
        <Button
            variant="kakao"
            onClick={handleLogin}
            className="fixed bottom-[35%] left-1/2 -translate-x-1/2 sm:bottom-[30%] px-6 py-3 h-auto gap-2"
        >
            <KakaoSymbol className="size-5" />
            카카오 로그인
        </Button>
    );
}