"use client";
import { updateMealAction } from "@/app/actions";
import { useTransition } from "react";
import { useState } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import {
  Trash,
  Edit,
  Star,
  Trash2Icon,
  Plus,
  PlusCircle,
  PlusCircleIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
interface FoodCardProps {
  id: string;
  name: string;
  description: string;
}
export default function FoodCard({ id, name, description }: FoodCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  let [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log("added to favourites");
  };

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
            <div className="flex gap-5 justify-between w-full items-center">
              <div className="flex gap-5">
                <Edit className="font-light text-sm" onClick={handleEditClick}>
                  Edit
                </Edit>
                <Star
                  className="font-light text-sm"
                  onClick={handleAddToFavourites}
                >
                  Add to favourites
                </Star>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2Icon className="font-light text-red-500 text-sm">
                      Delete
                    </Trash2Icon>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="">
                <Button className="rounded-full h-10 w-10">
                  <p className="text-xl">+</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
