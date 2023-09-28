"use client";
import { useState } from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";
import CategoryModal from "./category-modal";
export default function NewCategoryForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenCategoryModal() {
    console.log("modal opened");
    setIsModalOpen(true);
  }
  return (
    <Button
      onClick={handleOpenCategoryModal}
      className="rounded-full w-12 h-12  bottom-32 right-14 fixed"
    >
      <Plus />
      {isModalOpen && <CategoryModal />}
    </Button>
  );
}
