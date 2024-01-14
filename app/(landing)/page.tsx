import HeroSection from "@/components/hero";
import Profiles from "@/components/profiles";
import Specials from "@/components/specials";
import Slider from "@/components/ui/slider";
import { db } from "@/lib/db";

export default async function Home() {
  const meals = await db.meal.findMany({
    include: {
      creator: true,
      comments: true,
    },
  });
  

  const profiles = await db.profile.findMany()
  console.log(profiles);
  

  return (
    <main>
      <HeroSection />
      {meals.length > 0 && (
        <div className="maincol pb-10">
          <h1 className="text-semibold text-lg text-center mt-5 ">
            Check latest meals
          </h1>

          <Slider meals={meals} />
        </div>
      )}
      <hr />
      <div className="maincol mt-10">
        <h1 className="text-yellow-500 font-semibold text-2xl text-center">
          Specials
        </h1>
        <Specials meals={meals} />
      </div>
      <div className="flex w-full">
        <Profiles profiles={profiles}/>
      </div>
    </main>
  );
}
