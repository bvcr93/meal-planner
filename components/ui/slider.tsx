"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ReceiptIcon,
  ShoppingBag,
} from "lucide-react";

export default function Slider() {
  const slides = [
    {
      text: "Plan your meals for the week ahead efficiently with our easy-to-use meal planner.",
      icon: <Calendar size={30} />,
    },
    {
      text: "Discover a vast collection of healthy recipes and diversify your diet.",
      icon: <ReceiptIcon size={30} />,
    },
    {
      text: "Generate shopping lists automatically based on your planned meals and never forget an ingredient.",
      icon: <ShoppingBag size={30} />,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[300px] md:w-3/4 mx-auto relative ">
      <div className="flex items-center justify-center w-full ">
        <ArrowLeft
          className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => handleArrowClick("left")}
        />

        <div className="flex flex-col items-center space-y-4 px-10">
          {slides[currentIndex].icon}
          <p className="text-center italic text-sm md:text-lg">
            {slides[currentIndex].text}
          </p>
        </div>

        <ArrowRight
          className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => handleArrowClick("right")}
        />
      </div>

      <div className="flex space-x-2 mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`block w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-gray-900" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
