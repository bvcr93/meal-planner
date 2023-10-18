"use client";
import { deleteMealAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Star, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Edit, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
import Spinner from "./spinner";

interface MealDetails {
  id: string;
  name: string;
  description: string;
}
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
  favoritedBy?: { name: string }[];
  hasViewDetails?: boolean;
  coverImage?: string;
  cookingTime?: number | null;
}

export default function FoodCard({
  id,
  name,
  description,
  creatorImageUrl,
  favoriteMeals = [],
  userId,
  cookingTime,
  coverImage,
}: FoodCardProps) {
  const { toast } = useToast();
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favoriteMeals.includes(id));

  const { user } = useUser();
  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (isFavorite) {
      handleRemoveFromFavourites();
    } else {
      handleAddToFavourites();
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setEditedDescription(description);
    setEditedName(name);
  }, [description, name]);

  const handleAddToFavourites = async () => {
    const mealId = id;
    const userId = user?.id;
    const mealName = name;
    const mealDescription = description;
    try {
      const response = await fetch("/api/favorites", {
        next: { revalidate: 10 },
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
        <Card
          className={cn(
            " relative dark:bg-transparent w-full min-h-[500px] hover:rounded-xl flex flex-col shadow-lg hover:shadow-xl duration-300"
          )}
        >
          <CardHeader className="p-0">
            <CardDescription>
              {coverImage && (
                <Link href={`/explore/${name}`}>
                  <div className="h-[500px] hover:bg-black relative hover:rounded-xl flex justify-center items-center">
                    <Image
                      src={coverImage}
                      width={1000}
                      height={1000}
                      alt=""
                      className="h-full object-cover absolute inset-0 rounded-xl hover:rounded-xl"
                    />

                    <div className="absolute inset-0 text-white text-xl hover:rounded-xl flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 duration-300 cursor-pointer">
                      <CardTitle className="l">
                        <div className="eading-7 mb-5 line-clamp-2 text-center w-full tracking-wide">
                          {name}
                        </div>
                        <div
                          className="foodcard-list overflow-x-hidden overflow-y-auto break-words text-sm mt-10 px-5"
                          dangerouslySetInnerHTML={{
                            __html: editedDescription,
                          }}
                        ></div>
                      </CardTitle>
                    </div>
                  </div>
                </Link>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-24 absolute right-2 top-4 items-center justify-between space-x-6 w-full">
            <div>
              {creatorImageUrl && (
                <Image
                  src={creatorImageUrl}
                  width={200}
                  height={200}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              )}
            </div>
            <div className="flex space-x-5 items-center">
              <div>
                <Link href={`/recipes/${name}`}>
                  <Edit size={22} className="hover:cursor-pointer" />
                </Link>
              </div>
              <div>
                <Star
                  className={`font-light text-sm cursor-pointer ${
                    isFavorite ? "text-yellow-300" : ""
                  }`}
                  onClick={(e) => toggleFavorite(e)}
                ></Star>
              </div>{" "}
              {user?.id === userId && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2Icon className="text-red-500">Delete</Trash2Icon>
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
          </CardContent>
          {cookingTime && (
            <div className="absolute bottom-2 right-2 text-sm p-2rounded-md flex items-center gap-2">
              <Clock /> {cookingTime}m
            </div>
          )}
        </Card>
      )}
    </>
  );
}
