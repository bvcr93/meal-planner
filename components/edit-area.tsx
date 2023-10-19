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
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editedName || !editedDescription || !meal?.id) {
      console.error("Required data is missing or undefined.");
      return;
    }

    setIsEditing(true);

    try {
      await updateMealAction(meal.id, editedName, editedDescription, false);
      toast({
        description: "Meal updated successfully!",
      });
      router.push("/recipes");
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen">
      <Input
        disabled={isEditing}
        className="w-2/3 rounded"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <Textarea
        disabled={isEditing}
        className="w-2/3 mt-5"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      ></Textarea>
      <Button type="submit" className="mt-10" disabled={isEditing}>
        {isEditing ? "Editing..." : "Save"}{" "}
      </Button>
    </form>
  );
}
