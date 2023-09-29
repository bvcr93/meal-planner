import NewMealForm from "@/components/ui/NewMealForm";
import { getMeals } from "@/lib/meals";

import FoodCard from "@/components/ui/food-card";
export default async function MealsPage() {
  const { meals } = await getMeals();
  console.log(meals);

  return (
    <div className="maincol relative min-h-screen">
      <NewMealForm />
      <div className="mt-20 font-semibold text-lg">Your meals</div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 place-items-center w-full h-ful">
        {meals?.map((meal) => (
          <FoodCard
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
          />
        ))}
      </div>
      {/* <NewCategoryForm /> */}
    </div>
  );
}
