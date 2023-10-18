"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { updateMealAction } from "@/app/actions";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
interface EditAreaProps {
  name: string | undefined;
  description: string | undefined;
  meal: Meal | null;
  allMeals: Meal[];
}
export default function EditArea({
  name,
  description,
  meal,
  allMeals,
}: EditAreaProps) {
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  console.log("Meal Name:", meal?.name);
  console.log("Meal Description:", meal?.description);
  console.log(allMeals);
  
  async function action(data: FormData) {
    const name = data.get("name") as string;
    const description = data.get("description") as string;

    if (!name || !description || !meal?.id) {
      return;
    }
    if (editedName && editedDescription) {
      await updateMealAction(meal.id, editedName, editedDescription, isEditing);
      toast({
        description: editedDescription,
      });
    } else {
      console.error("Required data is missing or undefined.");
    }

    formRef.current?.reset();
  }
  return (
    <form ref={formRef} action={action} className="w-full h-screen">
      <Input
        className="w-2/3 rounded"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <Textarea
        name=""
        id=""
        className="w-2/3 mt-5"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      ></Textarea>
      <Button className="mt-10">Save</Button>
    </form>
  );
}
