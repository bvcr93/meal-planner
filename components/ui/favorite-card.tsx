"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";

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
    <div className="w-48 h-64 rounded-xl shadow-xl border flex flex-col items-center justify-center mt-20">
      <div>{name}</div>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>

      <Button onClick={handleRemoveFromFavourites} size={"sm"} className="mt-5">
        Remove
      </Button>
    </div>
  );
}
