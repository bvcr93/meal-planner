"use client";
import qs from "query-string";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
interface CategoryProps {
  data: Category[];
}

export const Categories = ({ data }: CategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div>
      {data.map((cat) => (
        <Button onClick={() => onClick(cat.id)}>{cat.name}</Button>
      ))}
    </div>
  );
};
