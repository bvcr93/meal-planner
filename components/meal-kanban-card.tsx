import { useSortable } from "@dnd-kit/sortable";
import { Meal } from "@prisma/client";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MealKanbanCardProps {
  meal: Meal;
}
export default function MealKanbanCard({ meal }: MealKanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: meal.id,
    data: {
      type: "Meal",
      meal,
      kanbanColumnId: meal.kanbanColumnId,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-8 bg-slate-100 dark:bg-slate-800 text-center rounded-lg  duration-300 border border-black cursor-grab opacity-60"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-16 bg-slate-100  flex items-center justify-center dark:bg-slate-800 text-center rounded-lg hover:bg-slate-200 duration-300 cursor-grab"
    >
      <div className="flex justify-between w-full items-center px-10">
        <div className="text-sm">{meal.name}</div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Image
                src={meal.coverImage || ""}
                alt=""
                width={200}
                height={10}
                className="w-12 h-12 object-cover z-0 rounded-full"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{meal.name}</AlertDialogTitle>
                <AlertDialogDescription>
                  {meal.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
