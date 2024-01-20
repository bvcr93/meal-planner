import { useSortable } from "@dnd-kit/sortable";
import { Meal } from "@prisma/client";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
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
      className="h-8 bg-slate-100 dark:bg-slate-800 text-center rounded-lg hover:bg-slate-200 duration-300 cursor-grab"
    >
      {meal.name}
    </div>
  );
}
