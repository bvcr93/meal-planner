import NewMealForm from "@/components/ui/NewMealForm";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import { getMeals } from "@/lib/meals";
import Image from "next/image";
import Link from "next/link";
import meallanding from "../../public/meal-landing.jpg";
import { db } from "@/lib/db";
import Reviews from "@/components/reviews";

export default async function Home() {
  return (
    <div className="maincol  min-h-screen">
      <div className="mt-20 h-[500px] md:flex ">
        <div className="basis-1/2 flex flex-col items-start justify-center pr-[150px] leading-normal space-y-7">
          <h2 className="text-4xl">
            The easiest way to make your favourite meal
          </h2>
          <p>
            Discover the best recipes from around the world and learn how to
            cook them at home
          </p>
          <Link href={`/meals`}>
            <Button size="lg" className="text-md">
              Start trial
            </Button>
          </Link>
        </div>

        <div className="basis-1/2 flex items-center justify-center ">
          <Image
            alt=""
            className="rounded-full w-[500px] h-[500px] object-cover hidden md:flex"
            src={meallanding}
            width={1000}
          />
        </div>
      </div>
      <div className="md:mt-20"></div>
      {/* <div>
        <h2 className="text-4xl">Create new meal</h2>
        <MealsPage />
      </div> */}

      {/* throw some styles here */}
      <Reviews />
    </div>
  );
}

// export async function MealsPage() {
//   const { meals } = await getMeals();
//   const favoriteMeals = await db.favoriteMeals.findMany();
//   const favoriteMealIds = favoriteMeals.map((meal) => meal.mealId);
//   meals?.sort(
//     (a, b) =>
//       (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
//       (a.createdAt ? new Date(a.createdAt).getTime() : 0)
//   );

//   return (
//     <div className="relative min-h-screen">
//       <NewMealForm />
//       <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 place-items-center w-full h-ful">
//         {meals?.map((meal) => (
//           <FoodCard
//             userId={meal.creator?.userId}
//             creatorImageUrl={meal.creator?.imageUrl}
//             creatorId={meal.creatorId}
//             key={meal.id}
//             id={meal.id}
//             favoriteMeals={favoriteMealIds}
//             name={meal.name}
//             description={meal.description}
//             createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
//           />
//         ))}
//       </div>{" "}
//     </div>
//   );
// }
