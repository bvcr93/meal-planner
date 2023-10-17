import React from "react";

interface MealDetailsProps {
  params: {
    id: string;
  };
}

export default async function MealDetails({
  params: { id },
}: MealDetailsProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-2xl">{id}</div>
    </div>
  );
}
