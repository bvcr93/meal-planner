"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Meal, Profile } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import FoodCard from "./food-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type TMeal = {
  id: string;
  name: string;
  description: string;
  isEdited: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  creatorId: string;
  creator?: Profile;
};

type SearchInputProps = {
  meals: any;
  favoriteMeals: any;
};

export default function SearchSection({
  meals,
  favoriteMeals,
}: SearchInputProps) {
  // console.log(meals);
  const searchParams = useSearchParams();
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");
  const [value, setValue] = useState(name || "");
  const router = useRouter();

  const debouncedValue = useDebounce(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    if (window.location.href !== url) {
      router.push(url);
    }

    const filtered = meals.filter((meal: Meal) =>
      meal.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [debouncedValue, categoryId, meals]);

  return (
    <div className="mb-20">
      <Input
        onChange={onChange}
        value={value}
        className="md:w-1/2 mx-auto md:mx-0 bg-transparent border-b border-slate-300"
        placeholder="Search meals"
      />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center mt-10 gap-10">
        {filteredMeals.map((meal: TMeal) => (
          // <Link href={`/explore/${meal.name}`}>
          <FoodCard
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            createdAt={meal.createdAt ? meal.createdAt.toISOString() : ""}
            updatedAt={meal.updatedAt ? meal.updatedAt.toISOString() : ""}
            creatorId={meal.creatorId}
            creatorImageUrl={meal.creator?.imageUrl}
            favoriteMeals={favoriteMeals}
            onOpenDialog={() => setIsModalOpen(true)}
            isModalOpen={isModalOpen}
            hasViewMore={true}
          />
          // </Link>
        ))}
      </div>
    </div>
  );
}
