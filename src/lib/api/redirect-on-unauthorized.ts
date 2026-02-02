import "server-only";
import { redirect } from "next/navigation";

export function redirectIfUnauthorized(response: Response): void {
  if (response.status === 401 || response.status === 403) {
    redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`);
  }
}
