import { create } from "zustand";
interface MealDetails {
  id: string;
  name: string;
  description: string;
}
interface FoodModalInterface {
  isOpen: boolean;
  selectedMeal: MealDetails | null;
  onOpen: (meal: MealDetails) => void;
  onClose: () => void;
}

const useFoodModal = create<FoodModalInterface>((set) => ({
  isOpen: false,
  selectedMeal: null,
  onOpen: (meal) => set({ isOpen: true, selectedMeal: meal }),
  onClose: () => set({ isOpen: false, selectedMeal: null }),
}));

export default useFoodModal;
