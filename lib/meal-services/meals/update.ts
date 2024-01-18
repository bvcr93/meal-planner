import { initialProfile } from "@/lib/profile";
import { db } from "@/lib/db";
export async function updateMeal(
  id: string,
  name: string,
  description: string,
  isEdited: boolean
) {
  const profile = await initialProfile();
  if (!profile || !profile.id) {
    throw new Error("Profile ID is missing or null");
  }

  const existingMeal = await db.meal.findUnique({
    where: { id },
  });

  if (!existingMeal) {
    throw new Error("Meal not found");
  }

  if (existingMeal.creatorId !== profile.id) {
    throw new Error("You do not have permission to update this meal");
  }

  try {
    const meal = await db.meal.update({
      where: { id },
      data: {
        name,
        description,
        isEdited,
      },
    });
    console.log(
      "Received data for updateMeal:",
      id,
      name,
      description,
      isEdited
    );

    return { meal };
  } catch (error) {
    console.error("Error updating meal:", error);
    return { error };
  }
}
