"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileImageField,
  NicknameField,
  GenderField,
  AgeGroupField,
  type BasicInfoFormValues,
} from "@/src/components/onboarding/basic";
import { basicInfoSchema } from "@/src/lib/schema/basic-information";
import { updateBasicInfo } from "@/src/lib/actions/user-basic-info";
import { getPresignedUrl } from "@/src/lib/actions/s3";
import { Button } from "../../ui/button";
import { toast } from "@/src/components/ui/sonner";
import { getImageContentType } from "@/src/constants/s3/util";
import { useCompleteOnboarding } from "@/src/hooks/use-complete-onboarding";

interface BasicInfoFormProps {
  defaultValues?: Partial<BasicInfoFormProps>;
  onSubmit?: (data: BasicInfoFormValues) => void;
}

export function BasicInfoForm({defaultValues, onSubmit}: BasicInfoFormProps){
  const { advanceToNextStep } = useCompleteOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { isValid } } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    mode: "all",
    defaultValues: {
      profileImage: null,
      nickname: "",
      gender: undefined,
      ageGroup: undefined,
      ...defaultValues,
    },
  });

  const onFormSubmit = async (data: BasicInfoFormValues) => {
    setIsSubmitting(true);

    let imagePath = "";
    const profileImage = data.profileImage;

    if (profileImage) {
      if (profileImage.size > 10 * 1024 * 1024) {
        toast.error("최대 용량은 10MB입니다.");
        setIsSubmitting(false);
        return;
      } else {
        const profileImageContentType = getImageContentType(profileImage);

        if (!profileImageContentType) {
          toast.error("지원하지 않는 이미지 형식입니다.");
          setIsSubmitting(false);
          return;
        } else {
          const presignedResult = await getPresignedUrl({
            directory: "users/profile",
            fileName: profileImage.name,
            contentType: profileImageContentType,
          });

          if (!presignedResult.success || !presignedResult.data) {
            toast.error(presignedResult.error || "업로드 실패, 재시도 해주세요.");
            setIsSubmitting(false);
            return;
          }

          const uploadResponse = await fetch(
            presignedResult.data.presignedUrl,
            {
              method: "PUT",
              headers: {
                "Content-Type": profileImageContentType,
              },
              body: profileImage,
            }
          );

          if (!uploadResponse.ok) {
            toast.error("업로드 실패, 재시도 해주세요.");
            setIsSubmitting(false);
            return;
          }

          imagePath = presignedResult.data.objectKey;
        }
      }
    }

    const result = await updateBasicInfo({
      imagePath,
      nickname: data.nickname,
      gender: data.gender,
      ageGroup: data.ageGroup,
    });

    if (result.success) {
      onSubmit?.(data);
      advanceToNextStep("CHARACTERISTIC");
    } else {
      toast.error(result.error || "저장에 실패했습니다.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mt-8">
        <ProfileImageField name="profileImage" control={control} />
      </div>

      <div className="mt-12 flex flex-col gap-11">
        <NicknameField name="nickname" control={control} />
        <GenderField name="gender" control={control} />
        <AgeGroupField name="ageGroup" control={control} />
      </div>

      <div className="mt-auto pt-8">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
        >
          {isSubmitting ? "저장 중..." : "다음"}
        </Button>
      </div>
    </form>
  );
}
