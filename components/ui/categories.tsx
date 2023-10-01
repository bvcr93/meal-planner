"use client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";

export const Categories = () => {
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
  return <div></div>;
};
