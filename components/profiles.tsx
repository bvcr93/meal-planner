import { Comment, Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProfileProps {
  profiles: Profile[];
  reviewsPerUser: number[];
  mealsPerUser: number[];
}

export default function Profiles({
  profiles,
  reviewsPerUser,
  mealsPerUser,
}: ProfileProps) {
  return (
    <div className="md:flex maincol mb-20 justify-around gap-10 grid grid-cols-1 place-items-center">
      {profiles.map((pr, index) => (
        <div className="flex w-full bg-white dark:bg-neutral-900" key={pr.id}>
          <div className="rounded-lg shadow-lg md:w-64 w-full border border-slate-800">
            <div className="h-24 dark:bg-neutral-800 bg-slate-900 rounded-t-lg" />
            <Image
              alt=""
              className="rounded-full -mt-12 w-32 h-32 border-4 border-white mx-auto object-cover"
              src={pr.imageUrl || ""}
              width={200}
              height={200}
            />
            <div className="text-center mt-2">
              <h2 className="text-lg font-semibold">{pr.name}</h2>
              <p className="text-gray-500">{}</p>
            </div>
            <div className="flex justify-around my-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg">{mealsPerUser[index]}</h3>
                <p className="text-gray-500">Meals</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {reviewsPerUser[index]}
                </h3>
                <p className="text-gray-500">Reviews</p>
              </div>
            </div>
            <div className="px-6 py-4">
              <Link href={`/profile/${pr.name}`}>
                <Button className="w-full bg-neutral-800 text-white rounded-lg hover:bg-blue-500">
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
