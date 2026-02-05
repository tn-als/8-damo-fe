"use client";

import { Camera, Settings } from "lucide-react";
import { Button } from "../../ui/button";

type PermissionError = "NotAllowedError" | "NotFoundError" | "NotReadableError" | "unknown";

interface CameraPermissionFallbackProps {
  error: PermissionError;
  onRetry: () => void;
}

const ERROR_MESSAGES: Record<PermissionError, { title: string; description: string }> = {
  NotAllowedError: {
    title: "카메라 접근이 거부되었습니다",
    description: "QR 코드를 스캔하려면 카메라 권한이 필요합니다. 브라우저 설정에서 카메라 권한을 허용해주세요.",
  },
  NotFoundError: {
    title: "카메라를 찾을 수 없습니다",
    description: "이 기기에서 사용 가능한 카메라가 없습니다. 카메라가 연결되어 있는지 확인해주세요.",
  },
  NotReadableError: {
    title: "카메라를 사용할 수 없습니다",
    description: "다른 앱에서 카메라를 사용 중일 수 있습니다. 다른 앱을 종료하고 다시 시도해주세요.",
  },
  unknown: {
    title: "카메라 오류가 발생했습니다",
    description: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};

export function CameraPermissionFallback({ error, onRetry }: CameraPermissionFallbackProps) {
  const { title, description } = ERROR_MESSAGES[error];
  const isPermissionError = error === "NotAllowedError";

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 text-center sm:px-6 sm:py-10">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted sm:size-16">
        <Camera className="size-7 text-muted-foreground sm:size-8" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex w-full max-w-[220px] flex-col gap-3">
        <Button onClick={onRetry} variant="default" className="w-full">
          다시 시도
        </Button>
        {isPermissionError && (
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => {
              // 브라우저 설정 안내 (직접 열 수 없으므로 안내만)
              alert("브라우저 주소창 왼쪽의 자물쇠 아이콘을 클릭하여 카메라 권한을 허용해주세요.");
            }}
          >
            <Settings className="size-4" />
            설정 안내
          </Button>
        )}
      </div>
    </div>
  );
}

export type { PermissionError };
