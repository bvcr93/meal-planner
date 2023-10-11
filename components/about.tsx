import React from "react";
import { Beef, GanttChart, Share } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
export default function AboutSection() {
  return (
    <div className="gap-5 my-20">
      <h2 className="text-2xl text-center mb-10">Why Foody?</h2>
      <div className="md:grid-cols-2 grid-cols-1 grid place-items-center gap-10">
        <Card className="w-[450px] md:w-full h-64 flex flex-col items-center justify-between shadow-lg p-4 space-y-4">
          <CardHeader className="flex justify-center items-center">
            <Beef className="w-10 h-10" />
          </CardHeader>
          <CardTitle className="text-xl">About</CardTitle>
          <CardContent>
            <p className="text-center">
              Foody is a recipe app that helps you discover the best recipes
            </p>
          </CardContent>
        </Card>

        <Card className="w-[450px] md:w-full h-64 flex flex-col items-center justify-between shadow-lg p-4 space-y-4">
          <CardHeader className="flex justify-center items-center">
            <GanttChart className="w-10 h-10" />
          </CardHeader>
          <CardTitle className="text-xl">Write it all down</CardTitle>
          <CardContent>
            <p className="text-center">
              Make sure you don't forget any of the ingredients or steps
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
