import { Fish, Leaf, PizzaIcon } from "lucide-react";
import React from "react";

export default async function DietaryPreferences() {
  return (
    <>
      <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
        <h3 className="text-lg font-semibold mb-2">Favorite Cuisines</h3>
        <div className="flex items-center gap-2">
          <PizzaIcon className="h-6 w-6" />
          <p>Italian</p>
        </div>
        <div className="flex items-center gap-2">
          <Fish className="h-6 w-6" />
          <p>Japanese</p>
        </div>
      </div>
      <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
        <h3 className="text-lg font-semibold mb-2">Dietary Preferences</h3>
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6" />
          <p>Vegan</p>
        </div>
        <div className="flex items-center gap-2">
          <Fish className="h-6 w-6" />
          <p>Pescatarian</p>
        </div>
      </div>
    </>
  );
}
