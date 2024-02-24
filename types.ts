import { Comment } from "@prisma/client";

export type TMeal = {
  id: string;
  name: string;
  description: string;
  isEdited: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  creatorId: string;
  cookingTime: number | null;
  coverImage: string | null;
  comments?: Comment[];
  kanbanColumnId?: string | null;
  averageRating?: number;

  creator?: {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  mealCreatorId?: string | null; // Add mealCreatorId property
};

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
