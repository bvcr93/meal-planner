"use client";
import useFoodModal from "@/hooks/useFoodModal";
import { useUser } from "@clerk/nextjs";
import Modal from "./modal";
import { Meal } from "@prisma/client";

interface FoodModalProps {
  meals: Meal[];
}

export default function FoodModal({ meals }: FoodModalProps) {
  const { user } = useUser();
  const { onClose, isOpen, selectedMeal } = useFoodModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <div>
      <Modal
        title={selectedMeal?.name || ""}
        description={selectedMeal?.description || ""}
        isOpen={isOpen}
        onChange={onChange}
        selectedMeal={selectedMeal}
        meals={meals}
      >
        asd
      </Modal>
    </div>
  );
}
