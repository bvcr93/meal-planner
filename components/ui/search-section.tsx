"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Meal } from "@prisma/client";
import FoodCard from "./food-card";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import qs from "query-string";

interface SearchInputProps {
  allMeals: any;
}

export default function SearchSection({ allMeals }: SearchInputProps) {
  const searchParams = useSearchParams();
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(allMeals);
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
    router.push(url);

    // Here's the filtering logic
    const filtered = allMeals.filter((meal: Meal) =>
      meal.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [debouncedValue, router, categoryId, allMeals]);

  return (
    <div>
      <Input
        onChange={onChange}
        value={value}
        className="border"
        placeholder="search"
      />
      <div className="grid grid-cols-3 place-items-center mt-10">
        {filteredMeals.map((meal) => (
          <FoodCard
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            createdAt={meal.createdAt ? meal.createdAt.toISOString() : ""}
            updatedAt={meal.updatedAt ? meal.updatedAt.toISOString() : ""}
            creatorId={meal.creatorId}
          />
        ))}
      </div>
    </div>
  );
}
