"use client";
import { Meal } from "@prisma/client";
import React, { useMemo, useState } from "react";
import ColumnContainer from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useEffect } from "react";
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

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
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
      >
        <div className="grid bg-slate-100 dark:bg-slate-900 rounded-xl lg:grid-cols-3 md:grid-cols-2 gap-10 my-20 py-20 px-10">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer meals={meals} column={col} key={col.id} />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer column={activeColumn}></ColumnContainer>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
  function onDragStart(event: DragStartEvent) {
    console.log("drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
}
