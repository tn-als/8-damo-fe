import { LoginLogo } from "@/src/components/login/login-logo";
import { LoginButton } from "@/src/components/login/login-button";

export default function LoginPage() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <LoginLogo />
        <LoginButton />
    </div>
  );
}