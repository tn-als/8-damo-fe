"use client";

import Link from "next/link";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { PROFILE_FALLBACK_IMAGE } from "@/src/constants/image";
import { GENDER_LABEL, AGE_GROUP_LABEL } from "@/src/constants/user";

interface ProfileCardProps {
  userId: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  imagePath: string | null;
}

function getProfileImageUrl(userId: string, imagePath: string | null): string | null {
  if (!imagePath) return null;
  const cdnUrl = process.env.NEXT_PUBLIC_S3_CDN;
  if (!cdnUrl) return null;
  return `https://${cdnUrl}/${imagePath}`;
}

export function ProfileCard({
  userId,
  nickname,
  gender,
  ageGroup,
  imagePath,
}: ProfileCardProps) {
  const imageUrl = getProfileImageUrl(userId, imagePath);

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4">
      {/* 프로필 정보 영역 */}
      <div className="flex items-center gap-4">
        <Avatar
          src={imageUrl}
          alt={nickname}
          fallbackUrl={PROFILE_FALLBACK_IMAGE}
          size="lg"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-lg font-semibold text-foreground">{nickname}</span>
          <div className="flex gap-2">
            {gender && (
              <Badge variant="secondary" size="sm">
                {GENDER_LABEL[gender] ?? gender}
              </Badge>
            )}
            {ageGroup && (
              <Badge variant="secondary" size="sm">
                {AGE_GROUP_LABEL[ageGroup] ?? ageGroup}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 프로필 수정 버튼 */}
      <Button variant="outline" className="w-full" asChild>
        <Link href="/mypage/edit-profile">프로필 수정하기</Link>
      </Button>
    </div>
  );
}
