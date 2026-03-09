"use client";

import { type ChangeEvent, useEffect, useReducer, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ReceiptPageClient,
  type ReceiptPageViewState,
} from "@/src/components/receipt/receipt-page-client";
import { ReceiptBottomNavigation } from "@/src/components/receipt/receipt-bottom-navigation";
import { toast } from "@/src/components/ui/sonner";
import {
  initialReceiptState,
  receiptReducer,
  type ReceiptState,
} from "./receipt.reducer";
import { uploadReceipt } from "@/src/lib/api/client/dining";
import { getPresignedUrl } from "@/src/lib/api/client/s3";
import { getImageContentType } from "@/src/constants/s3/util";
import type { ApiResponse } from "@/src/lib/api/client";

interface ReceiptInteractionProps {
  groupId: string;
  diningId: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["jpg", "png"]);

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function toViewState(state: ReceiptState): ReceiptPageViewState {
  switch (state.type) {
    case "idle": {
      return {
        type: "idle",
      };
    }

    case "selected": {
      return {
        type: "selected",
        previewUrl: state.previewUrl,
        selectedFileName: state.selectedFile.name,
      };
    }

    case "submitting": {
      return {
        type: "submitting",
        previewUrl: state.previewUrl,
        selectedFileName: state.selectedFile.name,
      };
    }

    case "error": {
      return {
        type: "error",
        previewUrl: state.previewUrl,
        selectedFileName: state.selectedFile.name,
        errorMessage: state.errorMessage,
      };
    }

    default: {
      return {
        type: "idle",
      };
    }
  }
}

export function ReceiptInteraction({ groupId, diningId }: ReceiptInteractionProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [state, dispatch] = useReducer(receiptReducer, initialReceiptState);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFilePicker = () => {
    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const resetToIdle = () => {
    if (state.type === "selected" || state.type === "error") {
      openFilePicker();
    }
  };

  const handleSelectFile = (file: File) => {
    const extension = getFileExtension(file.name);
    const isSupportedImage = ALLOWED_EXTENSIONS.has(extension);

    if (!isSupportedImage) {
      toast.error("JPG, PNG 파일만 업로드할 수 있어요.");
      resetInput();
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("이미지는 10MB 이하만 업로드할 수 있어요.");
      resetInput();
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    previewUrlRef.current = nextPreviewUrl;

    dispatch({
      type: "SELECT_FILE",
      file,
      previewUrl: nextPreviewUrl,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    handleSelectFile(file);
  };

  const handleUploadError = (fallback: string, response?: ApiResponse<unknown>) => {
    const errorMessage = response?.errorMessage ?? fallback;

    dispatch({
      type: "UPLOAD_ERROR",
      errorMessage,
    });
    toast.error(errorMessage);
  };

  const handleConfirm = async () => {
    if (state.type !== "selected" && state.type !== "error") {
      toast.error("먼저 영수증 이미지를 선택해주세요.");
      return;
    }

    const file = state.selectedFile;
    const contentType = getImageContentType(file);

    if (!contentType) {
      handleUploadError("지원하지 않는 이미지 형식입니다.");
      return;
    }

    dispatch({ type: "START_UPLOAD" });

    let presignedResult: Awaited<ReturnType<typeof getPresignedUrl>>;
    try {
      presignedResult = await getPresignedUrl({
        directory: "dining/receipt",
        fileName: file.name,
        contentType,
      });
      console.log(presignedResult);
    } catch (error: unknown) {
      const apiError = (error as { response?: { data?: ApiResponse<unknown> } })?.response?.data;
      handleUploadError("영수증 업로드에 실패했습니다. 다시 시도해주세요.", apiError);
      return;
    }

    const s3Response = await fetch(presignedResult.data.presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });

    if (!s3Response.ok) {
      handleUploadError("영수증 업로드에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    try {
      await uploadReceipt({
        groupId,
        diningId,
        receiptUrl: presignedResult.data.objectKey,
      });
      router.push(`/groups/${groupId}/dining/${diningId}`);
    } catch (error: unknown) {
      const apiError = (error as { response?: { data?: ApiResponse<unknown> } })?.response?.data;
      handleUploadError("영수증 업로드에 실패했습니다. 다시 시도해주세요.", apiError);
    }
  };

  const viewState = toViewState(state);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ReceiptPageClient
        viewState={viewState}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        onOpenFilePicker={openFilePicker}
      />
      <ReceiptBottomNavigation
        viewState={viewState}
        onReset={resetToIdle}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
