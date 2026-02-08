"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DiningDateTimeField } from "./dining-date-time-field";
import { DiningVoteDeadlineField } from "./dining-vote-deadline-field"
import { DiningBudgetField } from "./dining-budget-field";
import { DiningCreateSubmitArea } from "./dining-create-submit-area";
import { createDining } from "@/src/lib/api/client/dining";

export type DiningCreateFormValues = {
  diningDate?: Date;
  voteDueDate?: Date;
  budget?: number;
};

export interface DiningCreateRequest {
  diningDate: string;
  voteDueDate: string;
  budget: number;
}

interface DiningCreateContainerProps {
  groupId: string;
  defaultValues?: Partial<DiningCreateFormValues>;
  onSubmit?: (data: DiningCreateRequest) => void;
}

export function DiningCreateContainer({
  groupId,
  defaultValues,
  onSubmit,
}: DiningCreateContainerProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<DiningCreateFormValues>({
    mode: "onChange",
    defaultValues: {
      diningDate: undefined,
      voteDueDate: undefined,
      budget: undefined,
      ...defaultValues,
    },
  });

  const formatDateToMinute = (date: Date): string => {
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const HH = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
  }


  const onFormSubmit = async (data: DiningCreateFormValues) => {
    const requestBody: DiningCreateRequest = {
      diningDate: data.diningDate
        ? formatDateToMinute(data.diningDate)
        : "",
      voteDueDate: data.voteDueDate
        ? formatDateToMinute(data.voteDueDate)
        : "",
      budget: data.budget ?? 0,
    };

    try {
      await createDining(groupId, requestBody);

      if (onSubmit) {
        onSubmit(requestBody);
      }

      toast.success("회식이 생성되었습니다.");
      router.push(`/groups/${groupId}`);
    } catch {
      toast.error("회식 생성에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-1 flex-col bg-background px-4 pb-8 pt-12 sm:px-5 sm:pt-16"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <DiningDateTimeField name="diningDate" control={control} />
          <DiningVoteDeadlineField name="voteDueDate" control={control} />
          <DiningBudgetField name="budget" control={control} />
        </div>

        <div className="pt-12 sm:pt-16">
          <DiningCreateSubmitArea
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </div>
      </div>
    </form>
  );
}
