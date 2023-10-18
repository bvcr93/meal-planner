"use server";
import { createMeal, deleteMeal, getUserMealCount, updateMeal } from "@/lib/meals";
import { revalidatePath } from "next/cache";

export async function createMealAction(
  name: string,
  description: string,
  coverImage: string,
  cookingTime: number
) {
  console.log(
    "Creating meal with name:",
    name,
    "description:",
    description,
    "and coverImage:",
    coverImage,
    "and cookingTime:",
    cookingTime
  );
  await createMeal(name, description,coverImage, cookingTime);
  setTimeout(() => {
    revalidatePath("/(routes)/recipes");
  }, 3000);
  revalidatePath("/recipes/new");
}

export async function updateMealAction(
  id: string,
  name: string,
  description: string,
  isEdited: boolean
) {
  await updateMeal(id, name, description, isEdited);
  revalidatePath("/recipes");
}
export async function deleteMealAction(id: string) {
  await deleteMeal(id);
  revalidatePath("/recipes");
}

export async function getUserMealCountAction(userId: string): Promise<number> {
  const count = await getUserMealCount(userId);
  revalidatePath("/recipes");
  return count;
}
