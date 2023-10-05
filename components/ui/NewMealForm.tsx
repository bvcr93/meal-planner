"use client";
import { createMealAction } from "@/app/actions";
import { useRef, useState } from "react";
import { experimental_useFormStatus as UseFormStatus } from "react-dom";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "./use-toast";
export default function NewMealForm() {
  const { toast } = useToast();
  const { user } = useUser();
  // console.log("user", user?.id);
  // console.log(user);
  const formRef = useRef<HTMLFormElement>(null);

  async function createMeal(data: FormData) {
    try {
      const name = data.get("name");
      const description = data.get("description");

      if (!name || typeof name !== "string") return;
      if (!description || typeof description !== "string") return;
      // console.log(
      //   "Received data for meal creation - Name: ",
      //   name,
      //   "Description: ",
      //   description
      // );
      if (user && user.id) {
        await createMealAction(name, description, user.id);
        toast({
          title: `Meal created : ${name}`,
        });
      }

      formRef.current?.reset();
    } catch (error) {
    } finally {
    }
  }

  return (
    <>
      <form
        ref={formRef}
        action={createMeal}
        className="flex flex-col md:w-1/2 mt-10"
      >
        <div className="space-y-5">
          <InputComp />
          <TextAreaComp />
          <div className="flex gap-5 w-full">
            <SubmitButton />
          </div>
        </div>
      </form>
    </>
  );
}

function SubmitButton() {
  const data = UseFormStatus();
  const isLoading = data.pending;
  // console.log(data);
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? "Creating..." : "Add meal"}
    </Button>
  );
}

function InputComp() {
  const data = UseFormStatus();
  const isLoading = data.pending;
  return (
    <Input
      type="text"
      placeholder="Name"
      className="border"
      name="name"
      disabled={isLoading}
    />
  );
}

function TextAreaComp() {
  const data = UseFormStatus();
  const isLoading = data.pending;
  return (
    <Textarea
      placeholder="Ingredients, cooking time, etc..."
      className="border"
      name="description"
      disabled={isLoading}
    />
  );
}
