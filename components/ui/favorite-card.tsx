"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";
import Link from "next/link";

interface FavoriteCardProps {
  onRemove: (id: string) => void;
  coverImage?: string;
  id: string;
  name: string;
  description: string;
}

export default function FavoriteCard({
  id,
  name,
  description,
  onRemove,
  coverImage,
}: FavoriteCardProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
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
        onRemove(id);
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
    <Card className="w-[350px] hover:cursor-pointer hover:shadow-xl h-[500px] duration-300 bg-transparent flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle className="text-center font-mono font-medium">
          {name}
        </CardTitle>
        <CardDescription className="text-center flex flex-col items-center justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="my-5"
          ></div>
          {coverImage && (
            <Image
              className="w-32 h-32 rounded-full"
              onLoad={() => {
                console.log("image loaded");
              }}
              src={coverImage}
              alt=""
              height={400}
              width={400}
            />
          )}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-5">
        {" "}
        <Button
          onClick={handleRemoveFromFavourites}
          size={"sm"}
          className="mt-10"
        >
          Remove
        </Button>
        <Link href={`/explore/${name}`}>
          <Button className="mt-10">See</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
