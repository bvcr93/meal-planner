import React from "react";
import { Column } from "./kanban-board";
import { db } from "@/lib/db";
interface ColumnProps {
  column: Column;
}

export default async function ColumnContainer({ column }: ColumnProps) {
  return (
    <div className="bg-white shadow-lg text-sm cursor-pointer hover:shadow-xl duration-500 w-full flex items-center justify-center h-[100px] rounded-xl ">
      {column.title}
    </div>
  );
}
