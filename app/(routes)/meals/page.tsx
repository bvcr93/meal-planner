import NewMealForm from "@/components/ui/NewMealForm";
import FoodCard from "@/components/ui/food-card";
import Spinner from "@/components/ui/spinner";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
export default async function MealsPage() {
  const { meals } = await getMeals();
  console.log(meals);
  meals?.sort(
    (a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
      (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );

  return (
    <div className="maincol relative min-h-screen">
      <NewMealForm />
      <div className="mt-20 font-semibold text-lg">Your meals</div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 place-items-center w-full h-ful">
        {meals?.map((meal) => (
          <Suspense fallback={<Spinner />}>
            <FoodCard
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
            />
          </Suspense>
        ))}
      </div>
       {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}
      {/* this div should be active when category modal is opened */}
    </div>
  );
}
