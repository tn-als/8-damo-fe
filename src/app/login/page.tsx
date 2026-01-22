import { LoginLogo } from "@/src/components/login/login-logo";
import { LoginButton } from "@/src/components/login/login-button";

export default function LoginPage() {

  return (
    <>
      <main className="flex flex-col gap-6 px-4 py-4 sm:pt-4">
          <LoginLogo />
          <LoginButton />
      </main>
    </>
  );
}