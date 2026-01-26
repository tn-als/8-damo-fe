"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CameraScanSection } from "./camera-scan-section";
import { GroupJoinPreviewSection } from "./group-join-preview-section";
import { GroupJoinConfirmModal } from "./group-join-confirm-modal";
import { GroupSummary } from "@/src/types/groups";
import {
  GROUP_SUMMARY_MOCK_BY_ID,
  GROUP_SUMMARY_MOCK_LIST,
} from "@/src/constants/mock-data/group-summary";

type ScanResult = 
    | { status: "idle"}
    | { status: "success", group: GroupSummary}
    | { status: "error", message: string};

export function GroupJoinContainer() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<ScanResult>({status: "idle"});
  const [isScanning, setIsScanning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);


  const handleScanSuccess = useCallback((groupId: number) => {
    // 목 데이터에서 그룹 조회
    const group = GROUP_SUMMARY_MOCK_BY_ID[groupId];
    // const group = null;
    if (group){
        setScanResult({status: "success", group});
    } else {
        setScanResult({
            status: "error", 
            message: "존재하지 않는 그룹입니다. QR 코드를 확인해주세요.",
        });
    }
  }, []);

  const handleRescan = useCallback(() => {
    setScanResult({status: "idle"});
  }, []);

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalConfirm = useCallback(async () => {
    if (scanResult.status !== "success") return; 

    setIsJoining(true);

    try {
      // 목 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 처리
      toast.success(`${scanResult.group.name} 그룹에 참여했습니다!`);
      setIsModalOpen(false);
      router.push("/groups");
    } catch {
      toast.error("그룹 참여에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsJoining(false);
    }
  }, [scanResult, router]);

  return (
    <div className="flex flex-col flex-1">

      {scanResult.status === "idle" &&(
        <>
                <CameraScanSection
          onScanSuccess={handleScanSuccess}
          isScanning={isScanning}
          onScanningChange={setIsScanning} />

        <div className="mt-8 px-6">
          <p className="text-xs text-muted-foreground text-center mb-3">
            [개발용] 목 데이터로 테스트
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {GROUP_SUMMARY_MOCK_LIST.map((group) => (
              <button
              key={group.id}
              onClick={() => handleScanSuccess(group.id)}
              className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
              {group.name}
              </button>
            ))}
          </div>
        </div>
        </>
      )}

      {scanResult.status === "success" &&(
        <div className="flex-1 flex flex-col justify-center py-8">
          <GroupJoinPreviewSection
            group={scanResult.group}
            onJoinClick={() => setIsModalOpen(true)}
            onRescan={handleRescan}
          />
        </div>
      )}

      {scanResult.status === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-base font-medium text-destructive">{scanResult.message}</p>
          </div>
          <button
            onClick={handleRescan}
            className="text-sm font-medium text-primary underline"
          >
            다시 스캔하기
          </button>
        </div>
      )}

      {scanResult.status === "success" && (
        <GroupJoinConfirmModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          groupName={scanResult.group.name}
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
          isLoading={isJoining}
        />
      )}
    </div>
  );
}
