'use server'

import { createMeal } from "@/lib/meals"
import { revalidatePath } from "next/cache"

export async function createMealAction(name: string, description:string){
    await createMeal(name, description)
    revalidatePath('/')
}