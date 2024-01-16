"use client";
import { createCommentAction, deleteMealAction } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  Clock,
  Edit,
  MessageSquare,
  Send,
  Star,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MealHashtag from "../meal-hashtag";
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
import { Textarea } from "./textarea";
import { Comment } from "@prisma/client";
import { createComment } from "@/lib/meals";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  creatorId?: string;
  creatorImageUrl?: string;
  favoriteMeals?: string[];
  userId?: string;
  favoritedBy?: { name: string }[];
  coverImage?: string | undefined;
  cookingTime?: number | null;
  hasCreatorImage?: boolean;
  hasEditButton?: boolean;
  hasRemoveFromFavorites?: boolean;
  hasFavoriteStar?: boolean;
  allComments?: Comment[];
  comments?: number | undefined;
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
  hasCreatorImage = false,
  hasEditButton = false,
  hasRemoveFromFavorites,
  hasFavoriteStar,
  allComments,
  comments,
}: FoodCardProps) {
  const { toast } = useToast();
  const [editedDescription, setEditedDescription] = useState(description);
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favoriteMeals.includes(id));
  const [isLoading, setIsLoading] = useState(false);
  const [clickedStars, setClickedStars] = useState(0);
  const router = useRouter();

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
        description: "Failed to add to favorites. Please try again or sign in",
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
  console.log(userId);

  const handleCreateComment = async (data: FormData, ratingValue: number) => {
    try {
      setIsLoading(true);

      const text = data.get("text");
      const mealId = data.get("mealId");

      if (
        !text ||
        typeof text !== "string" ||
        !mealId ||
        typeof mealId !== "string"
      ) {
        setIsLoading(false);
        return;
      }

      // Call createCommentAction and get the result
      const result = await createCommentAction(mealId, text);
      if (result.error || !result.comment) {
        console.error("Error creating comment:", result.error);
        setIsLoading(false);
        return;
      }

      const comment = result.comment;

      const commentId = comment.comment?.id;
      console.log("comment id: ", commentId);

      router.push(`/explore/${name}`);
    } catch (error) {
      console.error("Error creating comment and rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarClick = (starIndex: number) => {
    setClickedStars(starIndex);
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
                  <div className="h-[500px] relative hover:bg-black hover:rounded-xl flex justify-center items-center">
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <Spinner />
                      </div>
                    )}
                    <Image
                      src={coverImage}
                      fill
                      alt=""
                      className="h-full object-cover absolute inset-0 rounded-xl hover:rounded-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={coverImage}
                      onLoad={() => {
                        setImageLoaded(true);
                      }}
                    />

                    <div className="absolute inset-0 text-white text-xl bg-black hover:rounded-xl flex justify-center items-center bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 duration-300 cursor-pointer">
                      <CardTitle className="l">
                        <div className="leading-7 line-clamp-2 h-[100px] flex items-center justify-center text-center w-full tracking-wide px-5">
                          {name}
                        </div>
                        <div
                          className="text-center text-sm mt-5 px-5"
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
              {hasCreatorImage && (
                <Image
                  src={creatorImageUrl || ""}
                  width={200}
                  height={200}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              )}
            </div>
            <div className="flex space-x-5 items-center">
              <div>
                {hasEditButton && (
                  <Link href={`/recipes/${name}`}>
                    <Edit
                      size={22}
                      className="hover:cursor-pointer text-white"
                    />
                  </Link>
                )}
              </div>
              <div>
                {hasFavoriteStar && (
                  <Star
                    className={`font-light text-sm cursor-pointer text-white ${
                      isFavorite ? "text-yellow-300" : ""
                    }`}
                    onClick={(e) => toggleFavorite(e)}
                  ></Star>
                )}
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
          {hasRemoveFromFavorites && (
            <Button
              variant={"link"}
              className="absolute bottom-5 flex w-full items-center justify-center text-red-500"
              onClick={handleRemoveFromFavourites}
            >
              Remove from favorites
            </Button>
          )}
          {cookingTime && (
            <div className="absolute bottom-2 right-2 text-sm p-2rounded-md flex items-center gap-2 text-white">
              <Drawer>
                <DrawerTrigger>
                  <MessageSquare />
                </DrawerTrigger>
                <DrawerContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateComment(
                        new FormData(e.currentTarget),
                        clickedStars
                      );
                    }}
                  >
                    <input type="text" name="commentId" className="hidden" />
                    <input type="hidden" name="mealId" value={id} />

                    <DrawerFooter>
                      <div className="flex flex-col">
                        <div className="flex flex-col items-center gap-4 mb-10">
                          {/* <h1>Leave a rating!</h1> */}
                          <div className="flex">
                            <input
                              type="text"
                              className="hidden"
                              name="commentId"
                            />
                            {/* {[1, 2, 3, 4, 5].map((starIndex) => (
                              <Star
                                key={starIndex}
                                className={`cursor-pointer ${
                                  starIndex <= clickedStars
                                    ? "text-yellow-500"
                                    : ""
                                }`}
                                onClick={() => handleStarClick(starIndex)}
                              />
                            ))} */}
                          </div>
                        </div>

                        <Textarea
                          disabled={isLoading}
                          className={`md:w-1/2 mx-auto w-full h-36 ${
                            isLoading ? "bg-slate-200" : "bg-slate-100"
                          } text-black`}
                          placeholder="Leave your comment here..."
                          name="text"
                        />
                      </div>
                      <div className="md:w-full flex justify-center">
                        <SubmitButton isLoading={isLoading} />
                      </div>
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </form>
                </DrawerContent>
              </Drawer>
              <div className="">{comments}</div>
              <Clock /> {cookingTime}m
            </div>
          )}
          <MealHashtag name={name} />
        </Card>
      )}
    </>
  );
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      className="my-5 md:w-1/2 w-full bg-blue-500 hover:bg-blue-600 text-white"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : <Send size={20} />}
    </Button>
  );
}
