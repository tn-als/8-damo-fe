"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DiningDateTimeField } from "./dining-date-time-field";
import { DiningVoteDeadlineField } from "./dining-vote-deadline-field";
import { DiningBudgetField } from "./dining-budget-field";
import { DiningCreateSubmitArea } from "./dining-create-submit-area";
import { createDining } from "@/src/lib/actions/dining";

export type DiningCreateFormValues = {
  diningDate?: Date;
  voteDueDate?: Date;
  budget?: number;
};

export interface DiningCreateRequest {
  diningDate?: string;
  voteDueDate?: string;
  budget?: number;
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

  const onFormSubmit = async (data: DiningCreateFormValues) => {
    try {
      const requestBody: DiningCreateRequest = {
        diningDate: data.diningDate?.toISOString(),
        voteDueDate: data.voteDueDate?.toISOString(),
        budget: data.budget ?? 0,
      };

      console.log("Request body:", requestBody);

      const result = await createDining(groupId, requestBody);

      console.log(result);

      if (!result.success) {
        toast.error(result.error || "회식 생성에 실패했습니다.");
        return;
      }

      if (onSubmit) {
        onSubmit(requestBody);
      }

      toast.success("회식이 생성되었습니다.");
      router.push(`/groups/${groupId}`);
    } catch (error) {
      toast.error("회식 생성에 실패했습니다.");
      console.error("Dining creation error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex min-h-[calc(100vh-56px)] flex-col bg-background px-[15px] pb-8 pt-[151px] sm:min-h-[calc(100vh-64px)] sm:px-5 sm:pt-[143px]"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-col gap-8">
          <DiningDateTimeField name="diningDate" control={control} />
          <DiningVoteDeadlineField name="voteDueDate" control={control} />
          <DiningBudgetField name="budget" control={control} />
        </div>

        <div className="mt-auto pt-8">
          <DiningCreateSubmitArea
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </div>
      </div>
    </form>
  );
}
