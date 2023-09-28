"use client";

import { Input } from "./input";

export default function CategoryModal() {
  return (
    <div className=" h-96 w-[200px] bg-black text-white absolute top-[50%] left-[50%]">
      <Input placeholder="Category name" />
      category modal
    </div>
  );
}
