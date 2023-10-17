"use client";
import { useModal } from "@/context/ModalContext";
import Modal from "./modal";
import { Meal } from "@prisma/client";

interface FoodModalProps {
  meals: Meal[];
}

export default function FoodModal({ meals }: FoodModalProps) {
  const {  closeModal, selectedMeal, isOpen } = useModal();

  const onChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };
  return (
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
  );
}
