'use client'
import { Meal } from "@prisma/client"
interface MealItemProps {
    id: string
    name: string
    description: string
}
export default function MealItem({id, name, description}: MealItemProps) {
  return (
    <div>{name}</div>
  )
}
