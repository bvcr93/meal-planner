"use client";
import { deleteMealAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Star, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}

export default function FoodCard({
  id,
  name,
  description,
  creatorImageUrl,
  favoriteMeals = [],
  userId,
  hasViewDetails,
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
            "lg:w-[500px] xl:w-[450px] w-full min-h-[500px] rounded-xl flex flex-col shadow-lg hover:shadow-xl duration-300"
          )}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-70 bg-black">
              <Spinner />
            </div>
          )}
          <CardHeader className="flex-grow">
            <div className="flex justify-between">
              {" "}
              <CardTitle className="leading-7 mb-5 line-clamp-2 text-center w-full">
                {name}
              </CardTitle>
    
            </div>
            <CardDescription>
              {/* <div
                className="foodcard-list overflow-x-hidden overflow-y-auto break-words"
                dangerouslySetInnerHTML={{ __html: editedDescription }}
              ></div> */}
              <div className="">
                {coverImage && (
                  <Link href={`/explore/${name}`}>
                    <div className="mt-10 h-[200px] hover:bg-black relative flex justify-center items-center">
                      <Image
                        src={coverImage}
                        width={1000}
                        height={1000}
                        alt=""
                        className="max-h-[200px] object-cover absolute inset-0 rounded-lg"
                      />

                      <div className="absolute inset-0 text-white text-xl flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 duration-300 cursor-pointer">
                        View recipe
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <Star
                className={`font-light text-sm cursor-pointer ${
                  isFavorite ? "text-yellow-300" : ""
                }`}
                onClick={(e) => toggleFavorite(e)}
              >
                {isFavorite ? "Remove from favourites" : "Add to favourites"}
              </Star>

              <div className="flex justify-between w-full items-center">
                <p className="text-sm font-medium leading-none">
                  {!isFavorite ? "Add to favorites" : "Remove from favorites"}
                </p>
                <p>
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
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            {user?.id === userId && (
              <>
                <Button size="sm" asChild className="w-full bg-emerald-500">
                  <Link href={`/recipes/${name}`}>Edit</Link>
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
