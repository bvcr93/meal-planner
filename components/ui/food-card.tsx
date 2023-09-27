"use client";
import React from "react";
interface FoodCardProps {
  id: string;
  name: string;
  description: string;
}
export default function FoodCard({ id, name, description }: FoodCardProps) {
  return (
    <div className="w-96 h-96 border rounded-xl shadow-md hover:shadow-xl duration-200 cursor-pointer">
      <div className="w-full border-b text-center py-2 font-semibold">
        {name}
      </div>
      <div className="w-full h-full flex items-start p-5 font-light text-sm">
        {description}
      </div>
    </div>
  );
}
