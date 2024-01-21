"use client";
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
import { SortableContext } from "@dnd-kit/sortable";
import { Meal } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ColumnContainer from "./column-container";
import MealKanbanCard from "./meal-kanban-card";
import ListContainer from "./list-container";
import React from "react";
import { debounce } from "lodash";
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
const MemoizedColumnContainer = React.memo(ColumnContainer);
const MemoizedMealKanbanCard = React.memo(MealKanbanCard);

export default function KanbanBoard({ meals }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  console.log("Rendering KanbanBoard component");

  const columnsId = useMemo(() => {
    console.log("columnsId useMemo");
    return columns.map((col) => col.id);
  }, [columns]);
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const initialMeals = useMemo(() => {
    console.log("initialMeals useMemo");
    return meals.map((meal) => ({
      ...meal,
      kanbanColumnId: "setup",
    }));
  }, [meals]);
  const [mealsState, setMealsState] = useState<Meal[]>(initialMeals);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3 actiavation of drag and drop starts when moved 3px
      },
    })
  );
  const onDragStart = useCallback((event: DragStartEvent) => {
    console.log("onDragStart");
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Meal") {
      setActiveMeal(event.active.data.current.meal);
      return;
    }
  }, []);
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      console.log("onDragEnd");
      const { active, over } = event;

      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        setColumns((currentColumns) => {
          const newColumns = [...currentColumns];
          const activeIndex = currentColumns.findIndex(
            (col) => col.id === activeId
          );
          const overIndex = currentColumns.findIndex(
            (col) => col.id === overId
          );

          if (activeIndex !== -1 && overIndex !== -1) {
            [newColumns[activeIndex], newColumns[overIndex]] = [
              newColumns[overIndex],
              newColumns[activeIndex],
            ];
            return newColumns;
          }

          return currentColumns;
        });
      }
    },
    [setColumns]
  );

  const debouncedMealUpdate = useCallback(
    debounce((activeId: string, overColumnId: string) => {
      setMealsState((prevMeals) => {
        const activeMeal = prevMeals.find((meal) => meal.id === activeId);
        if (activeMeal && activeMeal.kanbanColumnId !== overColumnId) {
          return prevMeals.map((meal) =>
            meal.id === activeId
              ? { ...meal, kanbanColumnId: overColumnId }
              : meal
          );
        }
        return prevMeals;
      });
    }, 250),
    [setMealsState]
  );
  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;

      if (!over) return;
      const activeId = active.id.toString();
      const overId = over.id.toString();

      if (activeId === overId) return;
      const isActiveMeal = active.data.current?.type === "Meal";
      const isOverColumn = over.data.current?.type === "Column";

      if (isActiveMeal && isOverColumn) {
        const overColumnId = over.data.current?.column.id;
        debouncedMealUpdate(activeId, overColumnId);
      }
    },
    [debouncedMealUpdate]
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-20 px-10">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <MemoizedColumnContainer
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
              <MemoizedColumnContainer
                column={activeColumn}
                meals={meals.filter((meal) => meal.id === activeColumn.id)}
              ></MemoizedColumnContainer>
            )}
            {activeMeal && <MemoizedMealKanbanCard meal={activeMeal} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
