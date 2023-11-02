"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Meal, Profile } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import FoodCard from "./food-card";
import { Search } from "lucide-react";

export type TMeal = {
  id: string;
  name: string;
  description: string;
  isEdited: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  creatorId: string;
  cookingTime: number | null;
  coverImage: string | null;
  creator?: {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

type SearchInputProps = {
  meals: TMeal[];
favoriteMeals: string[];
};

export default function SearchSection({
  meals,
  favoriteMeals,
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
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
      <div className="relative">
        <Input
          onChange={onChange}
          value={value}
          className="w-full rounded-full shadow-md py-6"
          placeholder="Search meals"
        />
        <div>
          <Search className="absolute top-3 right-5 dark:text-slate-200 text-neutral-600" />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center mt-10 gap-10">
        {filteredMeals.map((meal: TMeal) => (
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
            coverImage={meal.coverImage || undefined}
            hasCreatorImage={true}
            hasEditButton={false}
            cookingTime={meal.cookingTime}
            hasFavoriteStar
            hasRemoveFromFavorites={false}
          />
        ))}
      </div>
    </div>
  );
}
