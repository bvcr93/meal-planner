import NewMealForm from "@/components/ui/NewMealForm";
import { Button } from "@/components/ui/button";
import UserCount from "@/components/ui/user-count";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import { getMeals } from "@/lib/meals";
import { auth } from "@clerk/nextjs";
export default async function RepcipeCreationPage() {
  const { meals } = await getMeals();
  const { userId }: { userId: string | null } = auth();

  const currentUser = meals?.find((meal) => meal?.creator?.userId === userId);
  const currentUserCreatorId = currentUser?.creator?.id || null;
  return (
    <div className="h-screen">
      <NewMealForm />
      <Link href={`/recipes`}>
        <Button className="mt-10">go back</Button>
        <UserCount creatorId={currentUserCreatorId} meals={meals} />
      </Link>
    </div>
  );
}
