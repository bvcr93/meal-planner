import NewMealForm from "@/components/ui/NewMealForm";
import { getMeals } from "@/lib/meals";
import { Plus } from "lucide-react";

import FoodCard from "@/components/ui/food-card";
import { initialProfile } from "@/lib/profile";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import NewCategoryForm from "@/components/ui/new-category-form";
export default async function MealsPage() {
  const { meals } = await getMeals();
  console.log(meals);

  return (
    <div className="maincol relative min-h-screen">
      <NewMealForm />
      <div className="mt-20 font-semibold text-lg">Your meals</div>

      <div className="grid md:grid-cols-3 mt-10 gap-5 place-items-center w-full h-ful">
        {meals?.map((meal) => (
          <div className="">
            <FoodCard {...meal} />
          </div>
        ))}
      </div>
      {/* <NewCategoryForm /> */}
    </div>
  );
}
