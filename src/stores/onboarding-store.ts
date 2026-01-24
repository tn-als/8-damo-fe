import { create } from "zustand";

interface CharacteristicsState {
  noPreferences: boolean;
  allergies: string[];
  foodTypes: string[];
  ingredients: string[];
  additionalNotes: string;
}

interface OnboardingStore extends CharacteristicsState {
  setNoPreferences: (value: boolean) => void;
  setAllergies: (value: string[]) => void;
  setFoodTypes: (value: string[]) => void;
  setIngredients: (value: string[]) => void;
  setAdditionalNotes: (value: string) => void;
  resetCharacteristics: () => void;
  getCharacteristics: () => CharacteristicsState;
}

const initialState: CharacteristicsState = {
  noPreferences: false,
  allergies: [],
  foodTypes: [],
  ingredients: [],
  additionalNotes: "",
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  setNoPreferences: (value) => {
    set({
      noPreferences: value,
      ...(value && {
        allergies: [],
        foodTypes: [],
        ingredients: [],
        additionalNotes: "",
      }),
    });
  },

  setAllergies: (value) => set({ allergies: value }),
  setFoodTypes: (value) => set({ foodTypes: value }),
  setIngredients: (value) => set({ ingredients: value }),
  setAdditionalNotes: (value) => set({ additionalNotes: value }),

  resetCharacteristics: () => set(initialState),

  getCharacteristics: () => {
    const { noPreferences, allergies, foodTypes, ingredients, additionalNotes } = get();
    return { noPreferences, allergies, foodTypes, ingredients, additionalNotes };
  },
}));
