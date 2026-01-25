import { create } from "zustand";
import { Allergy, Ingredient, FoodTypes } from "@/src/constants/onboarding-characteristic";

interface CharacteristicsState {
  noAllergy: boolean;
  allergies: Allergy[];
  foodTypes: FoodTypes[];
  ingredients: Ingredient[];
  additionalNotes: string;
}

interface OnboardingStore extends CharacteristicsState {
  setNoAllergy: (value: boolean) => void;
  setAllergies: (value: Allergy[]) => void;
  setFoodTypes: (value: FoodTypes[]) => void;
  setIngredients: (value: Ingredient[]) => void;
  setAdditionalNotes: (value: string) => void;
  resetCharacteristics: () => void;
  getCharacteristics: () => CharacteristicsState;
}

const initialState: CharacteristicsState = {
  noAllergy: false,
  allergies: [],
  foodTypes: [],
  ingredients: [],
  additionalNotes: "",
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  setNoAllergy: (value) => {
    set({
      noAllergy: value,
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
    const { noAllergy, allergies, foodTypes, ingredients, additionalNotes } = get();
    return { noAllergy, allergies, foodTypes, ingredients, additionalNotes };
  },
}));
