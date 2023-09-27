import NewMealForm from "@/components/ui/NewMealForm";
import { getMeals } from "@/lib/meals";

import FoodCard from "@/components/ui/food-card";
import { initialProfile } from "@/lib/profile";
import { db } from "@/lib/db";
export default async function MealsPage() {
  const { meals } = await getMeals();
  const profile = await initialProfile();

  const meal = await db.meal.findFirst({
    where: {
      id: profile?.id,
    },
  });
  console.log("meal: ", meal);
  return (
    <div className="maincol ">
      <NewMealForm />
      <div className="mt-20 font-semibold text-lg">Your meals</div>

      <div className="grid md:grid-cols-3 mt-10 gap-5 place-items-center w-full h-ful">
        {meals?.map((meal) => (
          <div className="">
            <FoodCard {...meal} />
          </div>
        ))}
      </div>
    </div>
  );
}
