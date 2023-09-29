'use server'

import { createMeal,updateMeal, deleteMeal } from "@/lib/meals"
import { revalidatePath } from "next/cache"

export async function createMealAction(name: string, description:string){
    console.log("Creating meal with name:", name, "and description:", description);
    await createMeal(name, description)
    revalidatePath('/meals') 
}

export async function updateMealAction(id: string, name: string, description: string, isEdited: boolean){
    await updateMeal(id, name, description, isEdited)
    revalidatePath('/meals')
}
export async function deleteMealAction(id: string){
    await deleteMeal(id)
    revalidatePath('/meals')
} {
    
}