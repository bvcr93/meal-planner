import { db } from "@/lib/db"
import { initialProfile } from "@/lib/profile";
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