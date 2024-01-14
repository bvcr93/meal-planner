import { Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface ProfileProps {
  profiles: Profile[];
}

export default function Profiles({ profiles }: ProfileProps) {
  return (
    <div className="flex maincol justify-around gap-10">
      {profiles.map((pr) => (
        <div className="flex" key={pr.id}>
          <div className="rounded-lg shadow-lg w-64">
            <div className="h-24 bg-blue-600 rounded-t-lg" />
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
                <h3 className="font-semibold text-lg">2500</h3>
                <p className="text-gray-500">Calories</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">10</h3>
                <p className="text-gray-500">Likes</p>
              </div>
            </div>
            <div className="px-6 py-4">
              <Button className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Show recipee
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
