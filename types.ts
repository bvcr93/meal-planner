
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
  creator?: {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};
