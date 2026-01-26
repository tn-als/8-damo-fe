"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GroupImageUploadField } from "./group-image-upload-field";
import { GroupNameInputField } from "./group-name-input-field";
import { GroupIntroductionInputField } from "./group-introduction-input-field";
import { GroupLocationInputField } from "./group-location-input-field";
import { GroupCreateSubmitArea } from "./group-create-submit-area";
import { createGroup, getGroupProfilePresignedUrl } from "@/src/lib/actions/groups";

export type GroupCreateFormValues = {
  groupImage: string;
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
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<GroupCreateFormValues>({
    mode: "onChange",
    defaultValues: {
      groupImage: "",
      groupName: "",
      introduction: "",
      ...defaultValues,
    },
  });

  const onFormSubmit = async (data: GroupCreateFormValues) => {
    try {
      if (!location) {
        toast.error("그룹 위치를 제공해주세요.");
        return;
      }

      const result = await createGroup({
        name: data.groupName,
        introduction: data.introduction ?? "",
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (!result.success) {
        toast.error(result.error || "그룹 생성에 실패했습니다.");
        return;
      }

      if (!result.groupId) {
        toast.error("groupId를 확인할 수 없습니다.");
        return;
      }

      if (profileImageFile) {
        const extension =
          profileImageFile.name.split(".").pop()?.toLowerCase() ?? "";
        const fileName = extension
          ? `${result.groupId}.${extension}`
          : result.groupId;
        const contentType = extension
          ? `image/${extension}`
          : profileImageFile.type;

        const presignedResult = await getGroupProfilePresignedUrl({
          fileName,
          contentType,
          directory: "groups/profile",
        });

        if (!presignedResult.success || !presignedResult.data) {
          toast.error(presignedResult.error || "이미지 업로드에 실패했습니다.");
          return;
        }

        const uploadResponse = await fetch(presignedResult.data.presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": profileImageFile.type,
          },
          body: profileImageFile,
        });

        if (!uploadResponse.ok) {
          toast.error("이미지 업로드에 실패했습니다.");
          return;
        }
      }

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
        <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 sm:max-w-[380px]">
          <GroupImageUploadField
            name="groupImage"
            control={control}
            onFileChange={setProfileImageFile}
          />

          <div className="flex flex-col gap-6">
            <GroupNameInputField name="groupName" control={control} />
            <GroupIntroductionInputField name="introduction" control={control} />
            <GroupLocationInputField onLocationChange={setLocation} />
          </div>

          <GroupCreateSubmitArea
            isSubmitting={isSubmitting}
            isValid={isValid && !!location}
          />
        </div>
      </div>
    </form>
  );
}
