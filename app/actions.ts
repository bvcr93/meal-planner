"use server";
import { getUserMealCount } from "@/lib/meals";
import { createMeal, updateMeal, deleteMeal } from "@/lib/meals";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createMealAction(name: string, description: string) {
  console.log(
    "Creating meal with name:",
    name,
    "and description:",
    description
  );
  await createMeal(name, description);
  revalidatePath("/recipes");
  revalidatePath("/explore");
  revalidateTag("meals");

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
