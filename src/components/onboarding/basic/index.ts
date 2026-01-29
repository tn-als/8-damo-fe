export { ProfileImageField } from "./profile-image-field";
export { NicknameField } from "./nickname-field";
export { GenderField } from "./gender-field";
export { AgeGroupField } from "./age-group-field";
export { BasicInfoForm } from "./basic-info-form";

export type BasicInfoFormValues = {
  profileImage: File | null;
  nickname: string;
  gender: "MALE" | "FEMALE";
  ageGroup: "TWENTIES" | "THIRTIES" | "FORTIES" | "FIFTIES_PLUS";
};
