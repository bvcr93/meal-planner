"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Meal, Profile } from "@prisma/client";
import FoodCard from "./food-card";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import qs from "query-string";

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
};

export default function SearchSection({ meals }: SearchInputProps) {
  // console.log(meals);
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
  
const makeApiCall = async () => {
  await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: 'John'}),
  })
      
  

}
  return (
    <div>
      <Input
        onChange={onChange}
        value={value}
        className="border"
        placeholder="search"
      />
      <div className="grid grid-cols-3 place-items-center mt-10 gap-10">
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
          />
        ))}
      </div>
      <button onClick={makeApiCall}>MAKE API CAL</button>
    </div>
  );
}
