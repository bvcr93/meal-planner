"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import ColumnContainer from "./column-container";
export type Id = string | null;

export interface Column {
  id: Id;
  title: string;
}

export default function KanbanBoard() {
  // Initialize the columns state with 7 columns, one for each day of the week
  const [columns, setColumns] = useState<Column[]>([
    { id: uuidv4(), title: "Monday" },
    { id: uuidv4(), title: "Tuesday" },
    { id: uuidv4(), title: "Wednesday" },
    { id: uuidv4(), title: "Thursday" },
    { id: uuidv4(), title: "Friday" },
    { id: uuidv4(), title: "Saturday" },
    { id: uuidv4(), title: "Sunday" },
  ]);

  return (
    <div className="mt-20 min-h-screen">
      <div className="m-auto xl:grid-cols-5 gap-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-items-center">
        {columns.map((col) => (
          <ColumnContainer column={col} key={col.id} />
        ))}
      </div>
    </div>
  );
}
