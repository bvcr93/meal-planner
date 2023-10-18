import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Or any other package for icons

export default function Footer() {
  return (
    <div className="w-full bg-slate-200 dark:bg-neutral-800 dark:text-white  h-full py-5 flex flex-col items-center justify-center text-gray-800">
      <div className="flex space-x-8 mb-6"></div>

      <div className="text-sm">© 2023 Meal Planner. All Rights Reserved.</div>
    </div>
  );
}
