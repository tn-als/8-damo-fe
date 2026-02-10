import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { LocationPermission } from "@/src/types/lightning";

interface LocationPermissionGateProps {
  permission: LocationPermission;
  onRequestPermission: () => void;
  children: ReactNode;
}

export function LocationPermissionGate({
  permission,
  onRequestPermission,
  children,
}: LocationPermissionGateProps) {
  if (permission === "granted") {
    return <>{children}</>;
  }

  return (
    <section className="rounded-2xl border border-[#d1d1d6] bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-primary p-2">
          <MapPin className="size-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-[#111111]">위치 권한이 필요해요</h2>
          <p className="mt-1 text-sm leading-5 text-[#666666]">
            내 주변 추천 식당을 보여주기 위해 위치 권한을 사용합니다.
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onRequestPermission}
        className="mt-4 h-11 w-full rounded-xl"
      >
        {permission === "denied" ? (
          <div>
            위치 권한을 설정에서 직접 허용해주세요.
          </div>
        ) : "위치 권한 허용"}
      </Button>
    </section>
  );
}
