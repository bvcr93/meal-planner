"use client";
import React from "react";
import { createMealAction } from "@/app/actions";

export default function NewMealForm() {
  async function createMeal(data: FormData) {
    const name = data.get("name");
    const description = data.get("description");
    if (!name || typeof name !== "string") return;
    if (!description || typeof description !== "string") return;

    await createMealAction(name, description);
  }

  return (
    <form action={createMeal}>
      <h2>create new meal</h2>
      <input type="text" placeholder="name" className="border" name="name"/>
      <input type="text" placeholder="desc" className="border" name="description"/>
      <button type="submit" className="border">
        add meal
      </button>
    </form>
  );
}
