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
    return  {meal} ;
  } catch (error) {
    return  error ;
  }
}
