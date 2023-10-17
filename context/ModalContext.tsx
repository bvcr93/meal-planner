"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
interface MealDetails {
  id: string;
  name: string;
  description: string;
}
interface ModalContextType {
  isOpen: boolean;
  selectedMeal: MealDetails | null;
  openModal: (meal: MealDetails) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetails | null>(null);

  const openModal = (meal: MealDetails) => {
    setSelectedMeal(meal);
    setIsOpen(true);
    console.log(isOpen)
  };
  
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, selectedMeal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
