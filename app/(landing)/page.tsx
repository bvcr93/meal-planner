import Reviews from "@/components/reviews";
import Specials from "@/components/specials";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import meallanding from "../../public/meal-landing.jpg";

export default async function Home() {
  const meals = await db.meal.findMany();
  return (
    <main>
      <div className="maincol h-full">
        <div className="mt-20 h-[500px] md:flex ">
          <div className="basis-1/2 flex flex-col items-start justify-center  leading-normal space-y-7">
            <h2 className="md:text-5xl text-4xl">
              The easiest way to make your favourite meal
            </h2>
            <p className="md:text-xl text-md">
              Discover the best recipes from around the world and learn how to
              cook them at home
            </p>

            <Button asChild size="lg" className="text-md">
              <Link href="/recipes/new">Get started</Link>
            </Button>

            <div className="flex items-center pt-14 space-x-4">
              <div className="flex justify-start w-3/4 space-x-[calc(-11%)]">
                <div
                  className="w-24 h-24 bg-cover bg-center rounded-full border-4 border-white z-10"
                  style={{
                    backgroundImage:
                      "url(https://randomuser.me/api/portraits/men/41.jpg)",
                  }}
                ></div>
                <div
                  className="w-24 h-24 bg-cover bg-center rounded-full border-4 border-white z-20"
                  style={{
                    backgroundImage:
                      "url(https://randomuser.me/api/portraits/women/68.jpg)",
                  }}
                ></div>
                <div
                  className="w-24 h-24 bg-cover bg-center rounded-full border-4 border-white z-30"
                  style={{
                    backgroundImage:
                      "url(https://randomuser.me/api/portraits/men/43.jpg)",
                  }}
                ></div>
              </div>
              <div className="w-full">
                <p>
                  <span className="font-semibold">+2,000</span> more people are
                  cooking with Foody
                </p>
              </div>
            </div>
          </div>

          <div className="basis-1/2 flex items-center justify-center ">
            <Image
              alt=""
              className="rounded-full w-[500px] h-[500px] object-cover hidden md:flex"
              src={meallanding}
              width={1000}
              priority
            />
          </div>
        </div>
      </div>
      <div className="md:py-24 bg-slate-200 dark:bg-neutral-900 flex items-center justify-center">
        <div className="maincol ">
          <Reviews />
        </div>
      </div>
      <div className="maincol pb-10">
        <h1 className="text-semibold text-lg text-center mt-5 ">
          Check latest meals
        </h1>
        <Slider meals={meals} />
      </div>
      <hr />
      <div className="maincol mt-10">
        <h1 className="text-yellow-500 font-semibold text-2xl text-center">
          Specials
        </h1>
        <Specials meals={meals} />
      </div>
    </main>
  );
}
