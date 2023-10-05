import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
export async function GET(req: Request) {
  return new Response("hi");
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { mealId } = await req.json(); // You should send the mealId from the frontend
    console.log("mealID: ", mealId);
    if (!userId || !mealId) {
      throw new Error("Required fields are missing or null");
    }

    // Check if the favorite already exists
    const existingFavorite = await db.favoriteMeals.findFirst({
      where: {
        profileId: userId,
        mealId: mealId,
      },
    });

    if (existingFavorite) {
      throw new Error("This meal is already favorited");
    }

    // Create a new favorite meal record
    const favorite = await db.favoriteMeals.create({
      data: {
        profileId: userId,
        mealId: mealId,
      },
    });

    return new Response(JSON.stringify({ success: true, favorite }));
  } catch (error) {
    const errorMessage = (error as Error).message;
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 400,
      }
    );
  }
}
