import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import meallanding from "../public/meal-landing.jpg";
import Reviews from "./reviews";
export default function HeroSection() {
  return (
    <div>
      <div className="maincol h-full mb-16">
        <div className="mt-20 h-[500px] xl:flex ">
          <div className="xl:basis-1/2 flex flex-col items-start justify-center leading-normal space-y-7">
            <h2 className="md:text-5xl text-4xl leading-[50px] md:leading-[60px]">
              The easiest way to make your favourite meal
            </h2>
            <p className="md:text-xl text-md">
              Discover the best recipes from around the world and learn how to
              cook them at home
            </p>
            <div className="md:flex grid grid-cols-1 md:gap-10 gap-5 items-center">
              <Link href="/recipes/new">
                <Button size="lg" className="">
                  Get started
                </Button>
              </Link>
              <Button size="lg" variant={"outline"} className="">
                Create weekly plan
              </Button>
            </div>
            <div className="flex items-center md:pt-14 space-x-4">
              <div className="md:flex">
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
                <div className="w-full md:mt-10 mt-4">
                  <span className="font-semibold">+2,000</span> more people are
                  cooking with Foody
                </div>
              </div>
            </div>
          </div>

          <div className="basis-1/2 flex items-center justify-center ">
            <Image
              alt=""
              className="rounded-full w-[500px] h-[500px] object-cover hidden xl:flex"
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
    </div>
  );
}
