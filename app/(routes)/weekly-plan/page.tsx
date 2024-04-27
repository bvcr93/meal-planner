import KanbanBoard from "@/components/kanban-board";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";
export const dynamic = "force-dynamic";
export default async function WeeklyPlan() {
  const meals = await db.meal.findMany();

  return (
    <div className="mt-20">
      <KanbanBoard meals={meals} />
    </div>
  );
}
