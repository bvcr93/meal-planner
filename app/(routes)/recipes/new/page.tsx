import NewMealForm from "@/components/NewMealForm";
import { Button } from "@/components/ui/button";
import UserCount from "@/components/ui/user-count";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import { getMeals } from "@/lib/meals";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
export default async function RepcipeCreationPage() {
  const { meals } = await getMeals();
  const { userId }: { userId: string | null } = auth();

  const currentUser = meals?.find((meal) => meal?.creator?.userId === userId);
  const currentUserCreatorId = currentUser?.creator?.id || null;
  return (
    <div className="min-h-screen w-full flex md:items-center flex-col">
      <div className="w-full mt-20">
        <NewMealForm />
      </div>
      <Link href={`/recipes`}>
        <div className="w-full flex items-center justify-center">
          <Button
            className="mt-10 border w-14 h-14 rounded-full"
            variant={"ghost"}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        {/* <UserCount creatorId={currentUserCreatorId} meals={meals} /> */}
      </Link>
    </div>
  );
}
