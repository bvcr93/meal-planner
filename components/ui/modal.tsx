"use client";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as Dialog from "@radix-ui/react-dialog";
interface MealDetails {
  id: string;
  name: string;
  description: string;
  // ... any other details you want to include
}
interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  meals: Meal[];
  selectedMeal: MealDetails | null; // Add this line
}

function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
  meals,
  selectedMeal,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-neutral-900/90 
            backdrop-blur-sm 
            fixed 
            inset-0
          "
        />
        <DialogContent
          className="
      
          "
        >
          <DialogTitle
            className="
              text-xl 
              text-center 
              font-bold 
              mb-4
            "
          >
            {selectedMeal?.name || ""}
          </DialogTitle>
          <DialogDescription
            className="
        mb-5 
        text-sm 
        leading-normal 
        text-center
    "
            dangerouslySetInnerHTML={{
              __html: selectedMeal?.description || "",
            }}
          />

          <div>{children}</div>
          <DialogTrigger
            asChild
            onClick={() => onChange(false)}
          ></DialogTrigger>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
