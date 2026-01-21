"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GroupImageUploadField } from "./group-image-upload-field";
import { GroupNameInputField } from "./group-name-input-field";
import { GroupIntroductionInputField } from "./group-introduction-input-field";
import { GroupLocationInputField } from "./group-location-input-field";
import { GroupCreateSubmitArea } from "./group-create-submit-area";

export type GroupCreateFormValues = {
  groupImage: string | null;
  groupName: string;
  introduction: string;
};

interface GroupCreateContainerProps {
  defaultValues?: Partial<GroupCreateFormValues>;
  onSubmit?: (data: GroupCreateFormValues) => void;
}

export function GroupCreateContainer({
  defaultValues,
  onSubmit,
}: GroupCreateContainerProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<GroupCreateFormValues>({
    mode: "onChange",
    defaultValues: {
      groupImage: null,
      groupName: "",
      introduction: "",
      ...defaultValues,
    },
  });

  const onFormSubmit = async (data: GroupCreateFormValues) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }

      toast.success("그룹이 생성되었습니다.");
      router.push("/groups");
    } catch (error) {
      toast.error("그룹 생성에 실패했습니다.");
      console.error("Group creation error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex min-h-[calc(100vh-64px)] flex-col bg-background px-5 py-8 sm:min-h-[calc(100vh-80px)]"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto flex w-full max-w-[360px] flex-col gap-12 sm:max-w-[380px]">
          <GroupImageUploadField name="groupImage" control={control} />

          <div className="flex flex-col gap-8">
            <GroupNameInputField name="groupName" control={control} />
            <GroupIntroductionInputField name="introduction" control={control} />
            <GroupLocationInputField />
          </div>

          <GroupCreateSubmitArea
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </div>
      </div>
    </form>
  );
}
