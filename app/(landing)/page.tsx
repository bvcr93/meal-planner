import Reviews from "@/components/reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import meallanding from "../../public/meal-landing.jpg";
import AboutSection from "@/components/about";
import Slider from "@/components/ui/slider";

export default async function Home() {
  return (
    <main>
      <div className="maincol h-full">
        <div className="mt-20 h-[500px] md:flex ">
          <div className="basis-1/2 flex flex-col items-start justify-center  leading-normal space-y-7">
            <h2 className="md:text-5xl text-3xl">
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
            />
          </div>
        </div>
      </div>
      <div className="md:py-24 bg-slate-200 dark:bg-neutral-900 flex items-center justify-center">
        <div className="maincol ">
          <Reviews />
        </div>
      </div>

      {/* <div className="maincol">
        <AboutSection />
      </div> */}
      <div className="maincol ">
        <Slider />
      </div>
    </main>
  );
}
