"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Header } from "../layout";

interface GroupQrShareContentProps {
  groupId: string;
  groupName: string;
}

export function GroupQrShareContent({ groupId, groupName }: GroupQrShareContentProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const qrImageUrl = `${process.env.NEXT_PUBLIC_S3_URL}/group/qr/${groupId}.png`;
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/groups/join?id=${groupId}`;

  console.log(qrImageUrl);

  const handleBack = () => {
    router.push(`/groups/${groupId}`)
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("링크가 클립보드에 복사되었습니다");
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      toast.error("링크 복사에 실패했습니다");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white">
      <Header title="QR 공유하기" onBack={handleBack} />

      <div className="flex flex-1 flex-col items-center gap-[72px] px-5 pt-[130px]">
        <h2 className="text-center text-2xl font-bold leading-8 text-foreground">
          그룹 이름 : {groupName}
        </h2>

        <div className="flex items-center justify-center">
          {imageError ? (
            <div className="flex size-[300px] items-center justify-center rounded-lg border border-border bg-muted">
              <p className="text-sm text-muted-foreground">QR 코드를 불러올 수 없습니다</p>
            </div>
          ) : (
            <Image
              src={qrImageUrl}
              alt={`${groupName} QR 코드`}
              width={300}
              height={300}
              className="size-[300px] object-contain"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>

        <button
          onClick={handleShare}
          className="flex h-16 w-full items-center justify-center gap-2.5 rounded-lg bg-primary/15 px-6 py-3 text-sm font-bold leading-[18px] text-primary transition-colors hover:bg-primary/20 active:bg-primary/25"
        >
          <Share2 className="size-5" />
          공유하기
        </button>
      </div>
    </div>
  );
}
