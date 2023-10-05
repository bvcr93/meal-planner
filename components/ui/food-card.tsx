"use client";
import { deleteMealAction, updateMealAction } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { Edit, Star, Trash2Icon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
import { Input } from "./input";
import Spinner from "./spinner";
import { Textarea } from "./textarea";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  creatorId: string;
  creatorImageUrl?: string;
  favoriteMeals?: any[];
  userId?: string;
}
export function getColorBasedOnId(id: string) {
  const colors = [
    "bg-gradient-to-r from-red-200 via-red-300 to-red-400",
    "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
    "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400",
    "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400",
    "bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400",
    "bg-gradient-to-r from-violet-200 via-violet-300 to-violet-400",
    "bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400",
    "bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400",
    "bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400",
  ];
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = sum % colors.length;
  return colors[colorIndex];
}

export default function FoodCard({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  creatorId,
  creatorImageUrl,
  favoriteMeals = [],
  userId,
}: FoodCardProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [tempName, setTempName] = useState(name);
  const [bgColor, setBgColor] = useState(() => getColorBasedOnId(id));
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favoriteMeals.includes(id));

  const { user } = useUser();

  const toggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFavourites();
    } else {
      handleAddToFavourites();
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  async function updateMeal(data: FormData) {
    const name = data.get("name");
    const description = data.get("description");
    if (!name || typeof name !== "string") return;
    if (!description || typeof description !== "string") return;

    await updateMealAction(id, name, editedDescription, isEditing);
    toast({
      description: editedDescription,
    });
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
      toast({
        description: "Meal sucessfully updated!",
      });
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavourites = async () => {
    const mealId = id;
    const userId = user?.id;
    const mealName = name;
    const mealDescription = description;
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId,
          userId,
          name: mealName,
          description: mealDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsFavorite(true);
        console.log(data.favorite);
        toast({
          description: "Meal successfully added to favorites!",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast({
        description: "Failed to add to favorites. Please try again.",
      });
    }
  };
  const handleDeleteClick = async () => {
    try {
      await deleteMealAction(id);
      toast({
        description: "Meal sucessfully deleted!",
      });
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };
  const handleRemoveFromFavourites = async () => {
    const mealId = id;
    const userId = user?.id;

    try {
      const response = await fetch(`/api/favorites/${mealId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsFavorite(false);
        toast({
          description: "Meal successfully removed from favorites!",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast({
        description: "Failed to remove from favorites. Please try again.",
      });
    }
  };

  return (
    <>
      {isClient && (
        <div
          className={`w-80 h-96 border rounded-xl shadow-md hover:shadow-xl duration-200 relative ${bgColor}`}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-70 bg-black">
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
                      {user?.id === userId && (
                        <Edit
                          className="font-light text-sm cursor-pointer"
                          onClick={handleEditClick}
                        >
                          Edit
                        </Edit>
                      )}

                      <Star
                        className={`font-light text-sm cursor-pointer ${
                          isFavorite ? "text-yellow-300" : ""
                        }`}
                        onClick={toggleFavorite}
                      >
                        {isFavorite
                          ? "Remove from favourites"
                          : "Add to favourites"}
                      </Star>

                      <TrashIcon
                        className={`font-light text-sm cursor-pointer ${
                          !isFavorite ? "hidden" : ""
                        }`}
                        onClick={handleRemoveFromFavourites}
                      >
                        Remove from favourites
                      </TrashIcon>

                      {user?.id === userId && (
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
                                This will permanently delete this meal.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500"
                                onClick={handleDeleteClick}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    <div className="font-light mt-5">
                      {/* {new Date(createdAt).toLocaleDateString()} */}
                      {creatorImageUrl && (
                        <Image
                          alt=""
                          src={creatorImageUrl}
                          width={100}
                          height={100}
                          className="rounded-full h-10 w-10"
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative">
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
