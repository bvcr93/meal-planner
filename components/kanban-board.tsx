"use client";
import { Meal } from "@prisma/client";
import React, { useMemo, useState } from "react";
import ColumnContainer from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import MealKanbanCard from "./meal-kanban-card";
export interface Column {
  id: string;
  title: string;
}

const defaultCols: Column[] = [
  {
    id: "setup",
    title: "Initial meals",
  },
  {
    id: "monday",
    title: "Monday",
  },
  {
    id: "tuesday",
    title: "Tuesday",
  },
  {
    id: "wednesday",
    title: "Wednesday",
  },
  {
    id: "thursday",
    title: "Thursday",
  },
  {
    id: "friday",
    title: "Friday",
  },
  {
    id: "saturday",
    title: "Saturday",
  },
  {
    id: "sunday",
    title: "Sunday",
  },
];
interface KanbanBoardProps {
  meals: Meal[];
}
export default function KanbanBoard({ meals }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const initialMeals = meals.map((meal) => ({
    ...meal,
    kanbanColumnId: "setup",
  }));
  const [mealsState, setMealsState] = useState<Meal[]>(initialMeals);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3 actiavation of drag and drop starts when moved 3px
      },
    })
  );
  return (
    <div className="w-full">
      <h1 className="text-center md:text-2xl text-lg">
        Your Weekly Meal Planner
      </h1>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="grid bg-slate-100 dark:bg-slate-900 rounded-xl lg:grid-cols-3 md:grid-cols-2 gap-10 my-20 py-20 px-10">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                meals={mealsState.filter(
                  (meal) => meal.kanbanColumnId === col.id
                )}
                column={col}
                key={col.id}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                meals={meals.filter((meal) => meal.id === activeColumn.id)}
              ></ColumnContainer>
            )}
            {activeMeal && <MealKanbanCard meal={activeMeal} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Meal") {
      setActiveMeal(event.active.data.current.meal);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Ensure there's a target column
    if (!over || over.data.current?.type !== "Column") return;

    // IDs of the dragged meal and the target column
    const activeMealId = active.id; // Assuming this is a string
    const targetColumnId = over.data.current.column.id; // ID of the column

    // Check if the dragged item is a meal
    if (active.data.current?.type === "Meal") {
      setMealsState((currentMeals) =>
        currentMeals.map((meal) => {
          if (meal.id === activeMealId) {
            return { ...meal, kanbanColumnId: targetColumnId };
          }
          return meal;
        })
      );
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    console.log("Active item data:", active.data.current);
    console.log("Over item data:", over.data.current);
    const isActiveMeal = active.data.current?.type === "Meal";
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveMeal && isOverColumn) {
      const overColumnId = over.data.current?.column.id;

      setMealsState((meals) => {
        const activeMealIndex = meals.findIndex((meal) => meal.id === activeId);
        if (activeMealIndex === -1) return meals; // Meal not found

        const updatedMeals = [...meals];
        updatedMeals[activeMealIndex] = {
          ...updatedMeals[activeMealIndex],
          kanbanColumnId: overColumnId,
        };

        return updatedMeals;
      });
    }
  }
}
