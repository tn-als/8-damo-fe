import { z } from "zod/v4";
import { GENDER, AGE_GROUP } from "@/src/constants/user";

export const basicInfoSchema = z.object({
  profileImage: z.string().nullable(),
  nickname: z
    .string()
    .min(1, { error: "이름을 입력해 주세요." })
    .max(10, { error: "이름은 10자 이하여야 합니다." })
    .regex(/^[a-zA-Z가-힣]+$/, { error: "한글 또는 영문만 입력 가능합니다." }),
  gender: z.enum(GENDER, { error: "성별을 선택해주세요." }),
  ageGroup: z.enum(AGE_GROUP, { error: "연령대를 선택해주세요." }),
});