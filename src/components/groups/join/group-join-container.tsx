"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CameraScanSection } from "../shared/camera-scan-section";

type ScanResult = { status: "idle" } | { status: "error"; message: string };

export function GroupJoinContainer() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<ScanResult>({ status: "idle" });
  const [isScanning, setIsScanning] = useState(false);
  const [scannedGroupId, setScannedGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (!scannedGroupId) return;
    router.push(`/groups/preview/${scannedGroupId}`);
  }, [router, scannedGroupId]);

  const handleScanSuccess = useCallback(
    (groupId: string) => {
      setScannedGroupId(groupId);
    },
    []
  );

  const handleRescan = useCallback(() => {
    setScanResult({ status: "idle" });
    setScannedGroupId(null);
  }, []);

  return (
    <div className="relative flex flex-col flex-1">
      {scanResult.status === "idle" && (
        <div className="fixed inset-0 flex items-center justify-center">
          <CameraScanSection
            onScanSuccess={handleScanSuccess}
            isScanning={isScanning}
            onScanningChange={setIsScanning}
            disabled={Boolean(scannedGroupId)}
          />
        </div>
      )}

      {scanResult.status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 sm:px-6">
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
