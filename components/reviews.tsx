import React from "react";
import { Card } from "./ui/card";
import { Star } from "lucide-react";
import fish from "../public/fish.jpg";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const reviews = [
  {
    id: 1,
    name: "John Doe",
    meal: "Wild Salmon",
    review: "This recipe was so easy to follow, and the result was delicious!",
    mealType: "Dinner",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    meal: "Vegan Salad",
    review: "Healthy and tasty. I added some tofu for extra protein!",
    mealType: "Lunch",
    rating: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: 3,
    name: "Alan Turing",
    meal: "Pancakes",
    review: "Best breakfast ever! I topped mine with blueberries and honey.",
    mealType: "Breakfast",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
  },
];

export default function Reviews() {
  return (
    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 place-items-center gap-5">
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="w-[450px] h-96 flex flex-col items-center justify-between shadow-lg p-4 space-y-4"
        >
          <Image
            width={1000}
            height={100}
            src={review.image}
            alt={review.meal}
            className="w-full h-32 object-cover rounded"
          />
          <CardHeader className="flex flex-col items-center">
            <CardTitle>{review.meal}</CardTitle>
            <CardDescription>{review.mealType}</CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <blockquote className="italic">"{review.review}"</blockquote>

            <div className="flex justify-between items-center mt-2">
              <div className="flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="text-yellow-500 w-4 h-4" />
                ))}
              </div>

              <p className="font-semibold">{`- ${review.name}`}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
