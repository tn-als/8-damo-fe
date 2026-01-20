"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ProfileImageField,
  NicknameField,
  GenderField,
  AgeGroupField,
  type Gender,
} from "@/components/onboarding/basic";
import { useRouter } from "next/navigation";

interface BasicInfoFormProps {
  onBack?: () => void;
  onSubmit?: (data: {
    nickname: string;
    gender: Gender;
    ageGroup: string;
    profileImage: string | null;
  }) => void;
}

export function BasicInfoForm({ onBack, onSubmit }: BasicInfoFormProps) {
  const router = useRouter();
  const [nickname, setNickname] = React.useState("");
  const [gender, setGender] = React.useState<Gender>(null);
  const [ageGroup, setAgeGroup] = React.useState("");
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const handleSubmit = () => {
    onSubmit?.({
      nickname,
      gender,
      ageGroup,
      profileImage,
    });
    router.push('/onboarding/characteristics');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-5 pb-8">
      <div className="mt-8">
        <ProfileImageField value={profileImage} onChange={setProfileImage} />
      </div>

      <div className="mt-12 flex flex-col gap-11">
        <NicknameField value={nickname} onChange={setNickname} />
        <GenderField value={gender} onChange={setGender} />
        <AgeGroupField value={ageGroup} onChange={setAgeGroup} />
      </div>

      <div className="mt-auto pt-8">
        <Button
          onClick={handleSubmit}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
