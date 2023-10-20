"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { TMeal } from "./search-section";
interface SliderProps {
  meals: TMeal[];
}

export default function Slider({ meals }: SliderProps) {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_TO_SHOW = 5;

  const latestMeals = meals
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    })
    .slice(startIndex, startIndex + ITEMS_TO_SHOW);

  const handleNext = () => {
    if (startIndex + ITEMS_TO_SHOW < meals.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-5 my-10 relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={handlePrev}
      >
        <ArrowLeft />
      </button>

      {latestMeals.map((meal) => (
        <SliderCard meal={meal} />
      ))}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={handleNext}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

interface SliderCardProps {
  meal: TMeal;
}

function SliderCard({ meal }: SliderCardProps) {
  return (
    <div className="w-72 relative h-24 cursor-pointer flex items-center justify-center flex-col text-sm px-5 text-center hover:bg-gray-800 duration-200 rounded-xl">
      <p className="z-50"> {meal.name}</p>
      <Image
        src={meal.coverImage || ""}
        alt=" "
        fill
        className="object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
    </div>
  );
}
