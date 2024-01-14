"use server";
import {
  createMeal,
  deleteMeal,
  getUserMealCount,
  updateMeal,
  createComment,
  deleteComment,
  createSubcomment,
} from "@/lib/meals";
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
  await createMeal(name, description, coverImage, cookingTime);
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

export async function createCommentAction(mealId: string, text: string) {
  console.log("Creating comment with text:", text);
  await createComment(mealId, text);
  revalidatePath(`/recipes/${mealId}`);
}

export async function deleteCommentAction(commentId: string, mealId: string) {
  try {
    const result = await deleteComment(commentId);

    if (result.success) {
      console.log("Comment deleted successfully");

      revalidatePath(`/recipes/${mealId}`);
    } else {
      console.error("Failed to delete comment:", result.error);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

export async function createSubcommentAction(
  mealId: string,
  commentId: string,
  text: string
) {
  console.log("Creating subcomment with text:", text);

  try {
    const { subcomment, error } = await createSubcomment(
      mealId,
      commentId,
      text
    );

    if (error) {
      console.error("Error creating subcomment:", error);
    } else {
      console.log("Subcomment created:", subcomment);

      revalidatePath(`/recipes/${mealId}`);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
