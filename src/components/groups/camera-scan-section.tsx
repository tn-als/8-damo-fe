"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CameraPermissionFallback, type PermissionError } from "./camera-permission-fallback";

interface CameraScanSectionProps {
  onScanSuccess: (groupId: string) => void;
  isScanning: boolean;
  onScanningChange: (scanning: boolean) => void;
}

export function CameraScanSection({
  onScanSuccess,
  isScanning,
  onScanningChange,
}: CameraScanSectionProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<PermissionError | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {
        // 이미 멈춰있는 경우 무시
      }
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (!containerRef.current) return;

    setError(null);
    setIsInitializing(true);

    try {
      // 기존 스캐너 정리
      await stopScanner();

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1,
        },
        (decodedText) => {
          // QR 코드에서 groupId 추출
          // 예상 형식: https://damo.app/groups/join?id=xxx 또는 단순 groupId
          let groupId = decodedText;

          try {
            const url = new URL(decodedText);
            const idParam = url.searchParams.get("id");
            if (idParam) {
              groupId = idParam;
            }
          } catch {
            // URL이 아닌 경우 그대로 groupId로 사용
          }

          onScanSuccess(groupId);
          onScanningChange(false);
          stopScanner();
        },
        () => {
          // QR 코드 미감지 - 무시
        }
      );

      setIsInitializing(false);
      onScanningChange(true);
    } catch (err) {
      setIsInitializing(false);
      onScanningChange(false);

      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.message.includes("Permission denied")) {
          setError("NotAllowedError");
        } else if (err.name === "NotFoundError" || err.message.includes("not found")) {
          setError("NotFoundError");
        } else if (err.name === "NotReadableError") {
          setError("NotReadableError");
        } else {
          setError("unknown");
        }
      } else {
        setError("unknown");
      }
    }
  }, [onScanSuccess, onScanningChange, stopScanner]);

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  const handleRetry = () => {
    startScanner();
  };

  if (error) {
    return <CameraPermissionFallback error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 카메라 프리뷰 영역 */}
      <div className="relative w-full max-w-[280px] aspect-square">
        <div
          ref={containerRef}
          id="qr-reader"
          className="w-full h-full rounded-2xl overflow-hidden bg-muted"
        />

        {/* 스캔 가이드 오버레이 */}
        {(isScanning || isInitializing) && (
          <div className="absolute inset-0 pointer-events-none">
            {/* 코너 마커 */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />

            {/* 스캔 라인 애니메이션 */}
            <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-primary/50 animate-pulse" />
          </div>
        )}

        {/* 로딩 오버레이 */}
        {isInitializing && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">카메라 준비 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* 안내 텍스트 */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          그룹 QR 코드를 화면 안에 위치시켜 주세요
        </p>
      </div>
    </div>
  );
}
