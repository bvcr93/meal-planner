"use server";
import {
  createMeal,
  deleteMeal,
  getUserMealCount,
  updateMeal,
  createComment,
  deleteComment,
  createSubcomment,
  createRating,
} from "@/lib/meals";
import { Comment } from "@prisma/client";
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
  try {
    const comment = await createComment(mealId, text);
    revalidatePath(`/explore/${mealId}`);
    return { comment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error };
  }
}

export async function deleteCommentAction(commentId: string, mealId: string) {
  try {
    const result = await deleteComment(commentId);

    if (result.success) {
      console.log("Comment deleted successfully");

      // Update this path to re-fetch and update the specific meal's details
      revalidatePath(`/explore/${mealId}`);
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
export async function createRatingAction(
  mealId: string,
  ratingValue: number,
  profileId: string,
  commentId?: string
) {
  console.log("Creating rating for meal:", mealId, "with value:", ratingValue);

  try {
    const { rating, error } = await createRating(
      mealId,
      ratingValue,
      profileId,
      commentId
    );

    if (error) {
      console.error("Error creating rating:", error);
    } else {
      console.log("Rating created successfully:", rating);

      // Additional logic after creating a rating
      revalidatePath(`/recipes/${mealId}`);
      // If a commentId was involved, you might want to revalidate its path too
      if (commentId) {
        revalidatePath(`/comments/${commentId}`);
      }
      // Other relevant path updates can go here
    }
  } catch (error) {
    console.error("Unexpected error creating rating:", error);
  }
}
