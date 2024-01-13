import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function ProfilePage() {
  const { userId } = auth();

  const userProfile = await db.profile.findUnique({
    where: {
      id: userId || "",
    },
  });
  return <div>{userProfile?.name}</div>;
}
