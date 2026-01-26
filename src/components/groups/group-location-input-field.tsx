"use client";

import { useState } from "react";
import { MapPin, Check, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type LocationStatus = "idle" | "loading" | "granted" | "denied" | "unavailable";

interface GroupLocationInputFieldProps {
  onLocationChange?: (coords: { latitude: number; longitude: number } | null) => void;
}

export function GroupLocationInputField({ onLocationChange }: GroupLocationInputFieldProps) {
  const [status, setStatus] = useState<LocationStatus>("idle");

  const handleRequestLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("위치 정보:", { latitude, longitude });
        setStatus("granted");
        onLocationChange?.({ latitude, longitude });
      },
      (error) => {
        console.error("위치 권한 오류:", error.message);
        setStatus("denied");
        onLocationChange?.(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>위치 확인 중...</span>
          </>
        );
      case "granted":
        return (
          <>
            <Check className="size-5" />
            <span>위치 제공 완료</span>
          </>
        );
      case "denied":
        return (
          <>
            <MapPin className="size-5" />
            <span>위치 권한이 거부됨 (다시 시도)</span>
          </>
        );
      case "unavailable":
        return (
          <>
            <MapPin className="size-5" />
            <span>위치 서비스를 사용할 수 없음</span>
          </>
        );
      default:
        return (
          <>
            <MapPin className="size-5" />
            <span>그룹 위치 제공하기</span>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        그룹 위치 <span className="text-destructive">*</span>
      </label>
      <Button
        type="button"
        variant={status === "granted" ? "secondary" : "outline"}
        onClick={handleRequestLocation}
        disabled={status === "loading" || status === "unavailable"}
        className="h-12 w-full justify-start gap-3"
      >
        {getButtonContent()}
      </Button>
      <p className="text-xs text-muted-foreground">
        위치를 제공하면 근처 맛집을 추천받을 수 있습니다.
      </p>
    </div>
  );
}
