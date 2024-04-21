"use client";
import { Column } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Meal } from "@prisma/client";
import { useMemo, useState } from "react";
import MealKanbanCard from "./meal-kanban-card";
import { Input } from "./ui/input";
interface ColumnContainerProps {
  column: Column;
  meals?: Meal[];
}

export default function ColumnContainer({
  column,
  meals,
}: ColumnContainerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeals = useMemo(() => {
    if (!searchTerm.trim()) return meals;
    return (
      meals?.filter((meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [meals, searchTerm]);
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
  const isInitialMealsColumn = column.title === "Initial meals";

  const containerClassNames = `hover:shadow-xl duration-300 shadow-lg rounded-lg bg-white dark:bg-slate-950 ${
    isInitialMealsColumn ? "col-span-full overflow-y-auto h-auto" : "h-56"
  }`;

  const mealsContainerClassNames = isInitialMealsColumn
    ? "md:grid grid-cols-3 grid-cols-1 space-y-5 md:space-y-0 gap-4 pt-5 py-5"
    : "flex flex-col gap-3 pt-5";

  return (
    <div ref={setNodeRef} style={style} className={containerClassNames}>
      <div
        {...listeners}
        {...attributes}
        className="w-full sticky top-0 dark:bg-slate-900 bg-slate-200 rounded-t-lg h-10 flex items-center justify-center"
      >
        {column.title}
      </div>
      {isInitialMealsColumn && (
        <div className="p-5">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meals"
            className="w-full px-4 py-2 dark:bg-slate-900 border rounded-md shadow-sm" // Apply your styling here
          />
        </div>
      )}

      <div className={`mt-3 px-5 ${mealsContainerClassNames}`}>
        <SortableContext
          items={filteredMeals?.map((meal) => meal.id) || []}
          strategy={verticalListSortingStrategy}
        >
          {filteredMeals?.map((meal) => (
            <MealKanbanCard meal={meal} key={meal.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
