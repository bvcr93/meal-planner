import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: { mealId: string } }
) {
  try {
    const { userId } = auth();
    const mealId = params.mealId;
    console.log("favoritemealdeletedId: ", mealId);
    if (!userId || !mealId) {
      throw new Error("Required fields are missing or null");
    }

    const existingFavorite = await db.favoriteMeals.findFirst({
      where: {
        profileId: userId,
        mealId: mealId,
      },
    });

    if (!existingFavorite) {
      throw new Error("This meal is not in favorites");
    }

    await db.favoriteMeals.delete({
      where: {
        profileId_mealId: {
          profileId: userId,
          mealId: mealId,
        },
      },
    });
   
    return new Response(JSON.stringify({ success: true }));
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
