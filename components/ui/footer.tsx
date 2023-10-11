import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Or any other package for icons

export default function Footer() {
  return (
    <div className="w-full bg-slate-200 h-[400px] flex flex-col items-center justify-center text-gray-800">
      <div className="mb-6 text-center">
        Plan your meals efficiently, discover exciting recipes, and create
        shopping lists with ease.
      </div>

      <div className="flex space-x-8 mb-6">
        <a href="/about" className="hover:text-gray-600">
          About Us
        </a>
        <a href="/contact" className="hover:text-gray-600">
          Contact
        </a>
        <a href="/privacy" className="hover:text-gray-600">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-gray-600">
          Terms of Service
        </a>
      </div>

      <div className="flex space-x-6 mb-6">
        <a href="#" className="hover:text-gray-600">
          <Facebook size={24} />
        </a>
        <a href="#" className="hover:text-gray-600">
          <Instagram size={24} />
        </a>
        <a href="#" className="hover:text-gray-600">
          <Twitter size={24} />
        </a>
      </div>

      <div className="mb-6">
        <input
          type="email"
          placeholder="Subscribe to our newsletter"
          className="p-2 border rounded-md outline-none focus:border-blue-500"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Subscribe
        </button>
      </div>

      <div className="mb-6">
        Need help? Email us at:{" "}
        <a
          href="mailto:support@mealplanner.com"
          className="underline hover:text-gray-600"
        >
          support@mealplanner.com
        </a>
      </div>

      <div className="text-sm">© 2023 Meal Planner. All Rights Reserved.</div>
    </div>
  );
}
