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
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { toast } from "@/src/components/ui/sonner";

interface BasicInfoFormProps {
  defaultValues?: Partial<BasicInfoFormProps>;
  onSubmit?: (data: BasicInfoFormValues) => void;
}

export function BasicInfoForm({defaultValues, onSubmit}: BasicInfoFormProps){
  const router = useRouter();
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

    const result = await updateBasicInfo({
      imagePath: "",
      nickname: data.nickname,
      gender: data.gender,
      ageGroup: data.ageGroup,
    });

    if (result.success) {
      onSubmit?.(data);
      router.push("/onboarding/characteristic");
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
