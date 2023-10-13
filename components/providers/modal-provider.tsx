import { useEffect, useState } from "react";
import FoodModal from "../ui/food-modal";
import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";

export default async function ModalProvider() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    throw new Error("User not authenticated.");
  }
  const userProfile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userProfile) {
    throw new Error("Profile not found for the authenticated user.");
  }

  const meals = await db.meal.findMany({
    where: {
      creatorId: userProfile.id,
    },
    include: {
      creator: true,
    },
  });

  return (
    <>
      <FoodModal meals={meals} />
    </>
  );
}
