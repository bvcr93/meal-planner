import { db } from "./db";
import { initialProfile } from "./profile";

export async function getMeals() {
  try {
    const meals = await db.meal.findMany({
      include: {
        creator: true,
      },
    });
    console.log("meals found: ", meals);
    return { meals };
  } catch (error) {
    return { error };
  }
}

export async function getMealsByUser(creatorId: string) {
  try {
    const meals = await db.meal.findMany({ where: { creatorId } });
    return { meals };
  } catch (error) {
    return { error };
  }
}
export async function createMeal(
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

export async function getUserMealCount(userId: string): Promise<number> {
  try {
    const count = await db.meal.count({
      where: {
        creatorId: userId,
      },
    });
    // console.log("Retrieved count:", count);
    return count;
  } catch (error) {
    console.error("Error fetching meal count:", error);
    throw error;
  }
}

export async function getFavoriteMeals(userId: string) {
  try {
    const meals = await db.meal.findMany({
      where: {
        favoritedBy: {
          some: {
            profileId: userId,
          },
        },
      },
      include: {
        creator: true,
      },
    });
    console.log("meals found: ", meals);
    return { meals };
  } catch (error) {
    return { error };
  }
}

export async function createComment(mealId: string, text: string) {
  const profile = await initialProfile();

  if (!profile || !profile.id) {
    throw new Error("Profile ID is missing or null");
  }

  try {
    const comment = await db.comment.create({
      data: {
        text,
        mealId,
        profileId: profile.id,
      },
    });
    console.log("comment created with line: ", comment);

    return { comment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error };
  }
}


