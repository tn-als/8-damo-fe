"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import {
  ProfileImageField,
  NicknameField,
  GenderField,
  AgeGroupField,
  type BasicInfoFormValues,
} from "@/src/components/onboarding/basic";
import { useRouter } from "next/navigation";

interface BasicInfoFormProps {
  defaultValues?: Partial<BasicInfoFormValues>;
  onSubmit?: (data: BasicInfoFormValues) => void;
}

export function BasicInfoForm({ defaultValues, onSubmit }: BasicInfoFormProps) {
  const router = useRouter();

  const { control, handleSubmit } = useForm<BasicInfoFormValues>({
    defaultValues: {
      profileImage: null,
      nickname: "",
      gender: undefined,
      ageGroup: undefined,
      ...defaultValues,
    },
  });

  const onFormSubmit = (data: BasicInfoFormValues) => {
    onSubmit?.(data);
    router.push("/onboarding/characteristics");
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col bg-background pb-8"
    >
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
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90"
        >
          다음
        </Button>
      </div>
    </form>
  );
}
