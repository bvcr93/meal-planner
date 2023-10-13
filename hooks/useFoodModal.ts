import { create } from "zustand";
interface MealDetails {
  id: string;
  name: string;
  description: string;
  // ... any other details you want to include
}
interface FoodModalStore {
  isOpen: boolean;
  selectedMeal: MealDetails | null;
  onOpen: (meal: MealDetails) => void;
  onClose: () => void;
}

const useFoodModal = create<FoodModalStore>((set) => ({
  isOpen: false,
  selectedMeal: null,
  onOpen: (meal) => set({ isOpen: true, selectedMeal: meal }),
  onClose: () => set({ isOpen: false, selectedMeal: null }),
}));

export default useFoodModal;
