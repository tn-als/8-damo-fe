"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CameraScanSection } from "./camera-scan-section";

type ScanResult = { status: "idle" } | { status: "error"; message: string };

export function GroupJoinContainer() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<ScanResult>({ status: "idle" });
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSuccess = useCallback((groupId: string) => {
    router.push(`/groups/preview/${groupId}`);
  }, []);

  const handleRescan = useCallback(() => {
    setScanResult({ status: "idle" });
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {scanResult.status === "idle" && (
        <>
          <CameraScanSection
            onScanSuccess={handleScanSuccess}
            isScanning={isScanning}
            onScanningChange={setIsScanning}
          />
        </>
      )}

      {scanResult.status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-base font-medium text-destructive">
              {scanResult.message}
            </p>
          </div>
          <button
            onClick={handleRescan}
            className="text-sm font-medium text-primary underline"
          >
            다시 스캔하기
          </button>
        </div>
      )}
    </div>
  );
}
