import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function ProPage() {
  return (
    <div className="h-screen md:flex grid grid-cols-1 place-items-center md:items-center md:justify-center gap-5">
      <Card className="w-96 h-[500px] shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle className="w-full flex justify-between items-center">
            <div>Free</div>
            <div className="text-sm border-2 rounded-full px-5 py-1">Popular</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="my-2 font-semibold text-2xl">0$</p>
          <p className="my-2">Create up to 5 recipes</p>
          <Button className="w-full mt-5">Start Free Trial</Button>
          <div className="flex flex-col space-y-5 mt-10">
            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div> 
          </div>
        </CardContent>
      </Card>
      <Card className="w-96 h-[500px] shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle className="">Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="my-2 font-semibold text-2xl">20$/month</p>
          <p className="my-2">Create infinite amount of recipes</p>
          <Button className="w-full mt-5 bg-gradient-to-b from-orange-300 to-orange-500 hover:bg-gradient-to-b hover:from-orange-400 hover:to-orange-600 duration-300">
            Start Pro
          </Button>
          <div className="flex flex-col space-y-5 mt-10">
            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="flex gap-4">
              <Check />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
