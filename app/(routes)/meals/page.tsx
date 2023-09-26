import NewMealForm from "@/components/ui/NewMealForm";
import { Button } from "@/components/ui/button";
import Quill from "@/components/ui/text-editor";
import { db } from "@/lib/db";
import { getMeals } from "@/lib/meals";
import MealItem from "@/components/ui/MealItem";
export default async function MealsPage() {
  const { meals } = await getMeals();

  return (
    <div className="maincol">
      {/* <Quill /> */}
      <NewMealForm />
      {meals?.map((meal) => (
        <MealItem {...meal} key={meal.id} />
      ))}
    </div>
  );
}
