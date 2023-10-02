import NewMealForm from "@/components/ui/NewMealForm";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import { getMeals } from "@/lib/meals";
import Image from "next/image";
import Link from "next/link";
import meallanding from "../../public/meal-landing.jpg";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

export default async function Home() {
  return (
    <div className="maincol  min-h-screen">
      <div className="mt-10 h-[500px] md:flex ">
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
      <div className="md:mt-20">
        {/* <h2 className="text-4xl">Discover</h2> */}

        {/* <div className="md:col-span-2 mt-10">
          <div className="lg:flex sm:grid sm:grid-cols-2 grid-cols-1 gap-5 mt-20 space-y-10 md:space-y-0">
            {items.map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="flex flex-col items-center justify-center relative">
                  <Image
                    alt={item.alt}
                    className="rounded-full w-[300px] h-[300px] object-cover shadow-2xl"
                    src={item.src}
                    width={1000}
                    quality={100}
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                    <div className="rounded-full bg-black opacity-0 group-hover:opacity-70 w-[300px] h-[300px] transition-opacity duration-300 ease-in-out"></div>
                    <Button className="absolute opacity-0 hover:bg-white hover:text-black group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      View recipes
                    </Button>
                  </div>
                </div>
                <p className="mt-10 w-2/3 mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <div>
        <h2 className="text-4xl">Create new meal</h2>
        <MealsPage />
      </div>
    </div>
  );
}

async function MealsPage() {
  const { meals } = await getMeals();
  console.log("meals", meals);
  meals?.sort(
    (a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
      (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );

  return (
    <div className="relative min-h-screen">
      <NewMealForm />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-5 place-items-center w-full h-ful">
        {meals?.map((meal) => (
          <FoodCard
            userId={meal.creator?.userId}
            creatorImageUrl={meal.creator?.imageUrl}
            creatorId={meal.creatorId}
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
          />
        ))}
      </div>{" "}
    </div>
  );
}
