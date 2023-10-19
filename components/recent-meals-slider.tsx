import React from "react";
import { db } from "@/lib/db";
import Slider from "./ui/slider";

export default async function RecentMealsSlider() {
  const meals = await db.meal.findMany();
  console.log("meals:", meals);
  return (
    <div>
      <Slider meals={meals} />
    </div>
  );
}
