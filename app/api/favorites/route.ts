import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const favoriteMeals = await db.favoriteMeals.findMany({
      where: {
        profileId: userId,
      },
      include: {
        meal: true,
      },
    });

    const meals = favoriteMeals.map((fav) => fav.meal);

    return new Response(JSON.stringify({ success: true, meals }));
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

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { mealId } = await req.json();
    console.log("mealID: ", mealId);
    if (!userId || !mealId) {
      throw new Error("Required fields are missing or null");
    }

    const existingFavorite = await db.favoriteMeals.findFirst({
      where: {
        profileId: userId,
        mealId: mealId,
      },
    });

    if (existingFavorite) {
      throw new Error("This meal is already favorited");
    }

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
