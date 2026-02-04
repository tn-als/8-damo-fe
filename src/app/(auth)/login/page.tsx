import { LoginLogo } from "@/src/components/login/login-logo";
import { LoginButton } from "@/src/components/login/login-button";

export default function LoginPage() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col items-center justify-center gap-16 bg-white px-6">
      <LoginLogo />
      <LoginButton className="h-auto w-full max-w-xs gap-2 px-6 py-3" />
    </div>
  );
}