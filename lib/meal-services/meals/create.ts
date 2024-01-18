import { db } from "@/lib/db";
import { initialProfile } from "@/lib/profile";
export async function createMeal(
  // consider adding zod for form validation
  name: string,
  description: string,
  coverImage: string,
  cookingTime: number
) {
  const profile = await initialProfile();

  if (!profile || !profile.id) {
    throw new Error("Profile ID is missing or null");
  }

  try {
    const meal = await db.meal.create({
      data: {
        name,
        description,
        coverImage,
        creatorId: profile.id,
        cookingTime,
      },
    });

    return { meal };
  } catch (error) {
    return error;
  }
}
