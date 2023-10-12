"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FavoriteCardProps {
  id: string;
  name: string;
  description: string;
  onRemove: (id: string) => void;
}

export default function FavoriteCard({
  id,
  name,
  description,
  onRemove,
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
    <Card className="w-[350px] h-auto hover:shadow-lg flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle className="text-center font-mono font-medium">
          {name}
        </CardTitle>
        <CardDescription className="text-center">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </CardDescription>
      </CardHeader>

      <CardFooter>
        {" "}
        <Button
          onClick={handleRemoveFromFavourites}
          size={"sm"}
          className="mt-5"
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
