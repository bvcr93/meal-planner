import React from "react";
interface MealDetailsPageProps {
  params: {
    id: string;
  };
}
export default function MealDetailsPage({
  params: { id },
}: MealDetailsPageProps) {
  return <div>meal {id}</div>;
}
