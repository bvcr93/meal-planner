import { z } from 'zod';

export const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  cookingTime: z.number()
});

export type MealSchemaType = z.infer<typeof mealSchema>;
