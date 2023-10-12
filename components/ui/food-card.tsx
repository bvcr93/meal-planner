"use client";
import { deleteMealAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Star, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BellRing, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Spinner from "./spinner";
import Link from "next/link";
import { Button } from "./button";
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
}

export default function FoodCard({
  id,
  name,
  description,
  creatorImageUrl,
  favoriteMeals = [],
  userId,
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
        <Card
          className={cn(
            "lg:w-[500px] xl:w-[450px] w-full min-h-[500px] flex flex-col hover:shadow-xl duration-300"
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
              <CardTitle className="w-2/3 leading-7 mb-5">{name}</CardTitle>
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
            <CardDescription>
              <div
                className="foodcard-list overflow-x-hidden overflow-y-auto break-words"
                dangerouslySetInnerHTML={{ __html: editedDescription }}
              ></div>
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
            <div></div>
          </CardContent>
          <CardFooter>
            {user?.id === userId && (
              <Button size="sm" asChild className="w-full bg-emerald-500">
                <Link href={`/recipes/${name}`}>Edit</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}

// <>
//   {isClient && (
//     <div
//       className={`w-80 h-[400px] md:w-full min-h-96 border rounded-xl bg-white shadow-md hover:shadow-xl duration-200 relative`}
//     >
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-70 bg-black">
//           <Spinner />
//         </div>
//       )}
//       <div className="w-full mt-10 text-center py-2 font-semibold flex justify-between items-center px-5">
//         <p className="text-lg">{name}</p>
//         {creatorImageUrl && (
//           <Image
//             alt=""
//             src={creatorImageUrl}
//             width={100}
//             height={100}
//             className="rounded-full h-10 w-10"
//           />
//         )}
//       </div>

//       <div className="min-h-[200px] md:w-[280px] mx-auto font-light text-sm overflow-y-auto overflow-x-hidden">
//         <div
//           className="foodcard-list px-10"
//           dangerouslySetInnerHTML={{ __html: editedDescription }}
//         ></div>
//       </div>

//       <div className="flex justify-center py-2">
//         <div className="flex items-start w-full px-5">
//           <div className="flex gap-5 justify-between w-full items-center">
//             <div className="flex flex-col w-full">
//               <div className="flex gap-5">
//                 {hasFavoriteSign && (
//                   <Star
//                     className={`font-light text-sm cursor-pointer ${
//                       isFavorite ? "text-yellow-300" : ""
//                     }`}
//                     onClick={(e) => toggleFavorite(e)}
//                   >
//                     {isFavorite
//                       ? "Remove from favourites"
//                       : "Add to favourites"}
//                   </Star>
//                 )}

//                 {user?.id === userId && (
//                   <AlertDialog>
//                     <AlertDialogTrigger>
//                       <Trash2Icon className="font-light text-red-500 text-sm">
//                         Delete
//                       </Trash2Icon>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent className="">
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>
//                           Are you absolutely sure?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This will permanently delete this meal.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           className="bg-red-500"
//                           onClick={handleDeleteClick}
//                         >
//                           Delete
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 )}
//               </div>
//               <div className="font-light mt-5">
//                 <div className="w-full flex justify-between items-center gap-5">
//                   {user?.id === userId && (
//                     <Button size="sm" asChild className="w-full">
//                       <Link href={`/recipes/${name}`}>View</Link>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </>
