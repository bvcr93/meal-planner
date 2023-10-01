"use client";
import { deleteMealAction, updateMealAction } from "@/app/actions";
import { Edit, Star, Trash2Icon } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Input } from "./input";
import Spinner from "./spinner";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}
export default function FoodCard({
  id,
  name,
  description,
  createdAt,
  updatedAt,
}: FoodCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [tempName, setTempName] = useState(name);
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  console.log("name: ", name);
  console.log("description: ", description);
  console.log(createdAt, "createdAt");
  function getRandomColor() {
    const colors = [
      "bg-red-200",
      "bg-green-200",
      "bg-blue-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-violet-200",
      "bg-indigo-200",
      "bg-sky-200",
      "bg-rose-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    setIsClient(true);
  }, []);
  async function updateMeal(data: FormData) {
    const name = data.get("name");
    const description = data.get("description");
    if (!name || typeof name !== "string") return;
    if (!description || typeof description !== "string") return;

    await updateMealAction(id, name, editedDescription, isEditing);
    console.log("description:", description);
    console.log("editedDescription:", editedDescription);
  }
  useEffect(() => {
    setEditedDescription(description);
    setEditedName(name);
  }, [description, name]);
  const handleEditClick = () => {
    setIsEditing(true);
    setTempName(editedName);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedDescription(description);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("name", editedName);
    formData.append("description", editedDescription);

    try {
      setLoading(true);
      await updateMealAction(id, editedName, editedDescription, isEditing);
      setIsEditing(false);
      setEditedName(tempName);
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavourites = async () => {
    console.log("added to favourites");
  };
  const handleDeleteClick = async () => {
    try {
      await deleteMealAction(id);
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };
  return (
    <>
      {isClient && (
        <div
          className={`w-80 h-96 border rounded-xl shadow-md hover:shadow-xl duration-200 relative ${bgColor}`}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-80 bg-black">
              <Spinner />
            </div>
          )}
          <div className="w-full mt-10 text-center py-2 font-semibold">
            {isEditing ? (
              <div
                className="flex items-center justify-center
          "
              >
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-center outline-none w-1/2 mx-auto"
                />
              </div>
            ) : (
              <div>{name}</div>
            )}
          </div>

          <div className="min-h-[200px] p-5 font-light text-sm">
            {isEditing ? (
              <form action={updateMeal}>
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full h-32 border rounded"
                />
              </form>
            ) : (
              <>
                <div>{editedDescription}</div>
              </>
            )}
          </div>

          <div className="flex justify-center py-2">
            <div className="flex items-start w-full px-5">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleSaveClick}>Save</Button>
                  <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
              ) : (
                <div className="flex gap-5 justify-between w-full items-center">
                  <div className="flex flex-col">
                    <div className="flex gap-5">
                      <Edit
                        className="font-light text-sm cursor-pointer"
                        onClick={handleEditClick}
                      >
                        Edit
                      </Edit>
                      <Star
                        className="font-light text-sm cursor-pointer"
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
                        <AlertDialogContent className="">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteClick}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="font-light mt-5">
                      {new Date(createdAt).toLocaleDateString()}
                    </div>
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
      )}
    </>
  );
}
