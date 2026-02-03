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
  const isMountedRef = useRef(true);
  const isStartingRef = useRef(false);
  const isStoppingRef = useRef(false);
  const isRunningRef = useRef(false);
  const hasHandledSuccessRef = useRef(false);
  const [error, setError] = useState<PermissionError | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const stopScanner = useCallback(async () => {
    if (!scannerRef.current || isStoppingRef.current) return;

    isStoppingRef.current = true;

    try {
      if (isRunningRef.current) {
        await scannerRef.current.stop();
      }
      await scannerRef.current.clear();
      isRunningRef.current = false;
    } catch {
      // 이미 멈춰있는 경우 무시
    } finally {
      isStoppingRef.current = false;
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (!containerRef.current || !isMountedRef.current) return;
    if (isStartingRef.current || isStoppingRef.current || isRunningRef.current) return;

    setError(null);
    setIsInitializing(true);

    isStartingRef.current = true;
    hasHandledSuccessRef.current = false;

    try {
      // 기존 스캐너 정리
      await stopScanner();

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
      }

      await scannerRef.current.start(
        { facingMode: "environment" }, 
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1,
        },
        async (decodedText) => {

          let groupId: string | null = null;

          try {
            const url = new URL(decodedText);
            const match = url.pathname.match(/^\/groups\/preview\/([^/]+)$/);
            groupId = match?.[1] ?? null;
          } catch {
            groupId = null;
          }

          if (!groupId || !isMountedRef.current) return;
          if (hasHandledSuccessRef.current) return;

          hasHandledSuccessRef.current = true;

          await stopScanner();
          if (!isMountedRef.current) return;
          onScanningChange(false);
          onScanSuccess(groupId);
        },
        () => {
          // QR 코드 미감지 - 무시
        }
      );

      if (!isMountedRef.current) return;

      setIsInitializing(false);
      onScanningChange(true);
      isRunningRef.current = true;
    } catch (err) {
      if (
        err instanceof Error &&
        err.name === "AbortError" &&
        !isMountedRef.current
      ) {
        return;
      }

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
    } finally {
      isStartingRef.current = false;
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
