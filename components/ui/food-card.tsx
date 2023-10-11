"use client";
import { deleteMealAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { getColorBasedOnId } from "@/utils/getColor";
import { useUser } from "@clerk/nextjs";
import { Star, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
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
import { useRouter } from "next/navigation";
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
  hasFavoriteSign?: boolean;
  favoritedBy?: { name: string }[];
}

export default function FoodCard({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  creatorId,
  creatorImageUrl,
  hasFavoriteSign,
  // favoritedBy = [],
  favoriteMeals = [],
  userId,
}: FoodCardProps) {
  const { toast } = useToast();
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [bgColor, setBgColor] = useState(() => getColorBasedOnId(id));
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
  // Favorite star is not yellow when navgating back to the recipes route when favorite is active
  return (
    <>
      {isClient && (
        <div
          className={`w-80 md:w-full min-h-96 border rounded-xl bg-white shadow-md hover:shadow-xl duration-200 relative ${bgColor}`}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-70 bg-black">
              <Spinner />
            </div>
          )}
          <div className="w-full mt-10 text-center py-2 font-semibold">
            <div>{name}</div>
          </div>

          <div className="min-h-[200px] p-5 font-light text-sm">
            <>
              <div
                dangerouslySetInnerHTML={{ __html: editedDescription }}
              ></div>
            </>
          </div>

          <div className="flex justify-center py-2">
            <div className="flex items-start w-full px-5">
              <div className="flex gap-5 justify-between w-full items-center">
                <div className="flex flex-col w-full">
                  <div className="flex gap-5">
                    {hasFavoriteSign && (
                      <Star
                        className={`font-light text-sm cursor-pointer ${
                          isFavorite ? "text-yellow-300" : ""
                        }`}
                        onClick={(e) => toggleFavorite(e)}
                      >
                        {isFavorite
                          ? "Remove from favourites"
                          : "Add to favourites"}
                      </Star>
                    )}

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
                    <div className="w-full flex justify-between items-center">
                      {creatorImageUrl && (
                        <Image
                          alt=""
                          src={creatorImageUrl}
                          width={100}
                          height={100}
                          className="rounded-full h-10 w-10"
                        />
                      )}
                      <p className="text-sm">
                        {" "}
                        {new Date(createdAt).toLocaleDateString()}
                      </p>
                      {user?.id && (
                        <Link href={`/recipes/${name}`}>
                          <Button
                            variant="link"
                            size="sm"
                            className="font-thin text-sm"
                          >
                            Details
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
