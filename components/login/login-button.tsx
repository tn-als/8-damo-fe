"use client"

import Image from "next/image";

export function LoginButton(){
    const handleLogin = () => {
        // TODO: Implement OAuth login
        console.log("Login clicked");
    };

    return <>
        <button onClick={handleLogin} className="fixed bottom-24 mx-auto">
        <Image
          src="/kakao-login.png"
          alt="카카오 로그인"
          width={183}
          height={45}
          className="object-contain"
        />
      </button>
    </>
}