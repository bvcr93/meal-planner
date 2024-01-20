import React, { useMemo, useState } from "react";
import { Column } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Meal } from "@prisma/client";
import Image from "next/image";
import MealKanbanCard from "./meal-kanban-card";
interface ColumnContainerProps {
  column: Column;
  meals?: Meal[];
}

export default function ColumnContainer({
  column,
  meals,
}: ColumnContainerProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // styles that are enabling dragging
  };

  const mealsIds = useMemo(() => {
    return meals?.map((meal) => meal.id) || [];
  }, [meals]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-97 opacity-60  hover:shadow-xl duration-300 h-96 shadow-lg rounded-lg bg-white dark:bg-slate-950"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-97 hover:shadow-xl duration-300 h-96 shadow-lg rounded-lg bg-white dark:bg-slate-950"
    >
      <div
        {...listeners}
        {...attributes}
        className="w-full dark:bg-black bg-slate-200 rounded-t-lg h-10 flex items-center justify-center"
      >
        {" "}
        {column.title}
      </div>

      <div className=" w-full flex flex-col gap-3 mt-3 px-5">
        <SortableContext
          items={mealsIds}
          strategy={verticalListSortingStrategy}
        >
          {meals?.map((meal) => (
            <MealKanbanCard meal={meal} key={meal.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
