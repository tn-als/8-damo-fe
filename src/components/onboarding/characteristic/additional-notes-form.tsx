"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { AdditionalNotesField } from "./additional-notes-field";
import {
  additionalNotesSchema,
  type AdditionalNotesFormValues,
} from "@/src/lib/schema/characteristic";
import { useOnboardingStore } from "@/src/stores/onboarding-store";
import { updateCharacteristics } from "@/src/lib/actions/user-characteristics";
import { toast } from "@/src/components/ui/sonner";

export function AdditionalNotesForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { additionalNotes, setAdditionalNotes, getCharacteristics } =
    useOnboardingStore();

  const { control, handleSubmit } = useForm<AdditionalNotesFormValues>({
    resolver: zodResolver(additionalNotesSchema),
    mode: "onChange",
    defaultValues: {
      additionalNotes,
    },
  });

  const onSubmit = async (data: AdditionalNotesFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    setAdditionalNotes(data.additionalNotes);
    const characteristics = getCharacteristics();

    const result = await updateCharacteristics({
      allergies: characteristics.allergies,
      likeFoods: characteristics.foodTypes,
      likeIngredients: characteristics.ingredients,
      otherCharacteristics: data.additionalNotes,
    });

    if (result.success) {
      router.push("/");
    } else {
      toast.error(result.error || "재접속을 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <Controller
        name="additionalNotes"
        control={control}
        render={({ field }) => (
          <AdditionalNotesField
            value={field.value}
            onChange={field.onChange}
            showLabel={false}
          />
        )}
      />

      <div className="mt-auto pt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "처리중..." : "완료"}
        </Button>
      </div>
    </form>
  );
}
