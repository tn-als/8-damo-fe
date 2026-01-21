"use client"

import Image from "next/image";

export function LoginButton(){
    const handleLogin = () => {
        // TODO: Implement OAuth login
        console.log("Login clicked");
    };

    return <>
        <button onClick={handleLogin} className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-24">
        <Image
          src="/kakao-login.png"
          alt="카카오 로그인"
          width={183}
          height={45}
          className="h-auto w-[160px] object-contain sm:w-[183px]"
        />
      </button>
    </>
}