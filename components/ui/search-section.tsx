"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { TMeal } from "@/types";
import { Meal } from "@prisma/client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import FoodCard from "./food-card";
import SelectComponent from "./select";

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
  const [selectedSearchOption, setSelectedSearchOption] = useState("name"); 
  const [value, setValue] = useState(name || "");
  const router = useRouter();

  const debouncedValue = useDebounce(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const onSelectChange = (option: string) => {
    setSelectedSearchOption(option);
  };
  useEffect(() => {
    const query: Record<string, string | null> = {
      name: selectedSearchOption === "name" ? debouncedValue : null,
      categoryId: categoryId,
      cookingTime: selectedSearchOption === "cookingTime" ? debouncedValue : null,
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

    const filtered = meals.filter((meal: Meal) => {
      const nameMatch =
        selectedSearchOption === "name" &&
        meal.name.toLowerCase().includes(debouncedValue.toLowerCase());

      const cookingTimeMatch =
        selectedSearchOption === "cookingTime" &&
        meal.cookingTime === parseInt(debouncedValue);

      return nameMatch || cookingTimeMatch;
    });

    setFilteredMeals(filtered);
  }, [debouncedValue, categoryId, meals, selectedSearchOption]);

  return (
    <div className="mb-20">
      <div className="relative">
        <Input
          onChange={onChange}
          value={value}
          className="w-full rounded-full shadow-md py-6"
          placeholder="Search meals, cooking time (in mins....)"
        />
        <div className="mt-20">
        <SelectComponent onSelectChange={onSelectChange} />
        </div>
        <div>
          <Search className="absolute top-3 right-5 dark:text-slate-200 text-neutral-600" />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center mt-10 gap-10">
        {filteredMeals.slice(0, 6).map((meal: TMeal) => (
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
