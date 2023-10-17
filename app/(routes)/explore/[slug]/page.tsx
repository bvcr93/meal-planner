'use client'
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
interface MealDetailsProps {
  params: {
    slug: string;
  };
}
export default function MealDetails({ params: { slug } }: MealDetailsProps) {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-2xl">{slug}</div>
      <Button onClick={() => router.push("/explore")}>Back</Button>
    </div>
  );
}
