import { db } from "./db";
import { auth } from "@clerk/nextjs";
import { initialProfile } from "./profile";
export async function getMeals() {
  try {
    const meals = await db.meal.findMany();
    console.log("meals found: ", meals);
    return { meals };
  } catch (error) {
    return { error };
  }
}

export async function createMeal(name: string, description: string) {
  const profile = await initialProfile();
  console.log("profile: ", profile?.email);
  if (!profile || !profile.id) {
    throw new Error("Profile ID is missing or null");
  }

  try {
    const meal = await db.meal.create({
      data: {
        name,
        description,
        creatorId: profile.id,
      },
    });
    return { meal };
  } catch (error) {
    return error;
  }
}

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

  // Fetch the meal first to check if the current user is the creator
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
    return { error };
  }
}

export async function deleteMeal(id: string) {
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
    throw new Error("You do not have permission to delete this meal");
  }

  try {
    const meal = await db.meal.delete({
      where: { id },
    });
    return { meal };
  } catch (error) {
    return { error };
  }
}
