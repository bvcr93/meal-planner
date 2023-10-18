import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Or any other package for icons

export default function Footer() {
  return (
    <div className="w-full bg-slate-200 dark:bg-neutral-800 dark:text-white py-5 gap-5 flex items-center justify-end text-gray-800 px-10">
      <div className="text-sm font-thin">Privacy</div>
      <div className="text-sm font-thin">Settings</div>
    </div>
  );
}
