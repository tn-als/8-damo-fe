export const GENDER = ['MALE', 'FEMALE'] as const;
export const AGE_GROUP = [
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTIES_PLUS',
] as const;

export const GENDER_LABEL: Record<string, string> = {
  MALE: '남성',
  FEMALE: '여성',
};

export const AGE_GROUP_LABEL: Record<string, string> = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES: '50대 이상',
  FIFTIES_PLUS: '50대 이상',
};
