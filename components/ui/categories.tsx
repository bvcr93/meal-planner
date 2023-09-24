"use client";

import { Category } from "@prisma/client";

interface CategoryProps {
  data: Category[];
}

export const Categories = ({ data }: CategoryProps) => {
  return (
    <div>
      {data.map((cat) => (
        <div>{cat.name}</div>
      ))}
    </div>
  );
};
