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
import { debounce, update } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ColumnContainer from "./column-container";
import MealKanbanCard from "./meal-kanban-card";
import { Button } from "./ui/button";
import { createMealScheduleAction } from "@/app/actions";
import { useEffect, useRef } from "react";
import { useToast } from "./ui/use-toast";
import { getMeals } from "@/lib/meals";
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
  const [isMealDragged, setIsMealDragged] = useState(false);
  const { toast } = useToast();
  const dragOverlayRef = useRef(null);
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const updatedMeals = await getMeals();
        console.log(updatedMeals);

        setMealsState(updatedMeals);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };

    loadMeals();
  }, []);
  

  const columnsId = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const initialMeals = useMemo(() => {
    return meals.map((meal) => ({
      ...meal,
      kanbanColumnId: meal.kanbanColumnId || "setup",
    }));
  }, [meals]); 

  const [mealsState, setMealsState] = useState<Meal[]>(initialMeals);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
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
      const { active, over } = event;
      if (!over) return;
      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      const overColumnId = over?.data?.current?.column.id;
      const activeMeal = mealsState.find((meal) => meal.id === activeId);

      console.log(`Attempting to drop meal ${activeId} into ${overColumnId}`);
      if (activeMeal && activeMeal.kanbanColumnId !== overColumnId) {
        console.log(`Meal ${activeMeal.name} will be moved to ${overColumnId}`);
        setIsMealDragged(true);
        setMealsState((prevMeals) =>
          prevMeals.map((meal) => {
            return meal.id === activeId
              ? { ...meal, kanbanColumnId: overColumnId }
              : meal;
          })
        );
      } else {
        console.log(
          `No change for meal ${activeMeal ? activeMeal.name : "undefined"}`
        );
      }
    },
    [setMealsState, mealsState]
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

  const handleMealSaveDay = useCallback(async () => {
    console.log("handleMealSaveDay is triggered");
    if (activeMeal) {
      const mealId = activeMeal.id;
      const kanbanColumnId = activeMeal.kanbanColumnId;
      const result = await createMealScheduleAction(
        mealId,
        kanbanColumnId || ""
      );
      if (result.success) {
        toast({
          description: `Changes saved successfully`,
        });
        setIsMealDragged(false); // Reset to false after successful save
      } else {
        console.error("Failed to update meal schedule:", result.error);
      }
    }
  }, [activeMeal, createMealScheduleAction, toast]);


  return (
    <div className="w-full">
      <Button
        onClick={handleMealSaveDay}
        className="my-5 ml-10 w-48"
        disabled={!isMealDragged}
      >
        Save changes
      </Button>
  
      <h1 className="text-center md:text-2xl text-lg">
        Your Weekly Meal Planner
      </h1>
  
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-20 px-10 ">
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
        {dragOverlayRef.current && (
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <MemoizedColumnContainer
                  column={activeColumn}
                  meals={meals.filter((meal) => meal.id === activeColumn.id)}
                ></MemoizedColumnContainer>
              )}
              {activeMeal && <MemoizedMealKanbanCard meal={activeMeal} />}
            </DragOverlay>,
            dragOverlayRef.current
          )
        )}
      </DndContext>
    </div>
  );
  
}
