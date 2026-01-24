import { create } from "zustand";
import { Allergy, Ingredient, FoodTypes } from "@/src/constants/onboarding-characteristic";

interface CharacteristicsState {
  noPreferences: boolean;
  allergies: Allergy[];
  foodTypes: FoodTypes[];
  ingredients: Ingredient[];
  additionalNotes: string;
}

interface OnboardingStore extends CharacteristicsState {
  setNoPreferences: (value: boolean) => void;
  setAllergies: (value: Allergy[]) => void;
  setFoodTypes: (value: FoodTypes[]) => void;
  setIngredients: (value: Ingredient[]) => void;
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
