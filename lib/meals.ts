import { db } from "./db";

export async function getMeals() {
  try {
    const meals = await db.meal.findMany();
    return { meals };
  } catch (error) {
    return { error };
  }
}

export async function createMeal(name: string, description: string) {
  try {
    const meal = await db.meal.create({
      data: {
        name,
        description,
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
  try {
    const meal = await db.meal.update({
      where: { id },
      data: {
        name,
        description,
        isEdited,
      },
    });
    return { meal };
  } catch (error) {
    return { error };
  }
}

export async function deleteMeal(id: string) {
  try {
    const meal = await db.meal.delete({
      where: { id },
    });
    return { meal };
  } catch (error) {
    return { error };
  }
}
