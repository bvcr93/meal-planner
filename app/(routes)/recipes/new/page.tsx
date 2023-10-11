import NewMealForm from "@/components/ui/NewMealForm";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function RepcipeCreationPage() {
  return (
    <div className="maincol">
      <NewMealForm />
      <Link href={`/recipes`}>
        <Button className="mt-10">go back</Button>
      </Link>
    </div>
  );
}
