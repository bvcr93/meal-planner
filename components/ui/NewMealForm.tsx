"use client";
import React from "react";
import { createMealAction } from "@/app/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./button";
import { Input } from "./input";
import { useRef } from "react";
import { Textarea } from "./textarea";
export default function NewMealForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  async function createMeal(data: FormData) {
    const name = data.get("name");
    const description = data.get("description");
    if (!name || typeof name !== "string") return;
    if (!description || typeof description !== "string") return;

    await createMealAction(name, description);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={createMeal} className="flex flex-col w-1/2">
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">Create new meal</h2>
        <Input type="text" placeholder="name" className="border" name="name" />
        <Textarea
          placeholder="Ingredients, cooking time, etc..."
          className="border"
          name="description"
        />

        <Button type="submit" className="border" aria-disabled={pending}>
          Add meal
        </Button>
      </div>
    </form>
  );
}
