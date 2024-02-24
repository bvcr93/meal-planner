"use server";
import {
  getUserMealCount,
  createComment,
  deleteComment,
  createSubcomment,
  createRating,
  createNotification,
} from "@/lib/meals";
import { createMeal } from "@/lib/meal-services/meals/create";
import { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteMeal } from "@/lib/meal-services/meals/delete";
import { updateMeal } from "@/lib/meal-services/meals/update";
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
  revalidatePath("/(routes)/recipes");
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
      revalidatePath(`/recipes/${mealId}`);

      if (commentId) {
        revalidatePath(`/comments/${commentId}`);
      }
    }
  } catch (error) {
    console.error("Unexpected error creating rating:", error);
  }
}

export async function createNotificationAction(
  profileId: string,
  mealId: string,
  commentId?: string
) {
  console.log("Creating notification for meal:", mealId);

  try {
    const { notification, error } = await createNotification(
      profileId,
      mealId,
      commentId
    );

    console.log("notification created: ", notification);

    if (error) {
      console.error("Error creating notification:", error);
    } else {
      console.log("Notification created successfully:", notification);

      revalidatePath(`/`);
    }
  } catch (error) {
    console.error("Unexpected error creating notification:", error);
  }
}
