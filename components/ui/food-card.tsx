"use client";
import { updateMealAction } from "@/app/actions";
import { useTransition } from "react";
import { useState } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
interface FoodCardProps {
  id: string;
  name: string;
  description: string;
}
export default function FoodCard({ id, name, description }: FoodCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  let [isPending, startTransition] = useTransition();

  async function updateMeal(data: FormData) {
    const name = data.get("name");
    const description = data.get("description");
    if (!name || typeof name !== "string") return;
    if (!description || typeof description !== "string") return;

    await updateMealAction(name, description, id, isEditing);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDescription(description);
  };
  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await updateMealAction(
        name,
        editedDescription,
        id,
        isEditing
      );
      console.log("API response:", response);
    } catch (error) {
      console.error("Error updating meal:", error);
    }

    setIsEditing(false);
  };

  const handleAddToFavourites = async () => {
   console.log('added to favourites')
  }

  return (
    <div className="w-96 h-96 border rounded-xl shadow-md hover:shadow-xl duration-200 cursor-pointer">
      <div className="w-full mt-10 text-center py-2 font-semibold">{name}</div>
      <div className="min-h-[200px] p-5 font-light text-sm">
        {isEditing ? (
          <form action={updateMeal}>
            {" "}
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full h-32 border rounded p-2"
            />
          </form>
        ) : (
          <div>{editedDescription}</div>
        )}
      </div>

      <div className="flex justify-center py-2">
        <div className="flex items-start w-full px-5">
          {isEditing ? (
            <>
              <Button onClick={handleSaveClick}>Save</Button>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </>
          ) : (
            <div className="flex gap-5">
              <Button className="font-light text-sm" onClick={handleEditClick}>
                Edit
              </Button>
              <Button className="font-light text-sm" onClick={handleAddToFavourites}>
                Add to favourites
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
