"use client";

import { updateMealAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface EditAreaProps {
  name: string | undefined;
  description: string | undefined;
  id: string;
}
export default function EditArea({ name, description, id }: EditAreaProps) {
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      setError("");
    }
    if (editedName === name && editedDescription === description) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [editedName, editedDescription]);

  const handleUpdateMeal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editedName || !editedDescription) {
      setError("Please fill out all fields.");
      return;
    }
    setIsEditing(true);

    try {
      await updateMealAction(id, editedName, editedDescription, false);
      toast({
        description: "Meal updated successfully!",
      });
      router.push("/recipes");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleUpdateMeal} className="w-full h-screen">
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
      {error && <p className="text-red-500 mt-5">{error}</p>}
      <Button
        type="submit"
        className="mt-10"
        disabled={isEditing || isButtonDisabled}
      >
        {isEditing ? "Editing..." : "Save"}
      </Button>
    </form>
  );
}
