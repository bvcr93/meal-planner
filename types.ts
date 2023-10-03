type Profile = {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    // We're omitting createdMeals and favorites for simplicity. You can include them if needed.
  };
  
  type Meal = {
    id: string;
    name: string;
    description: string;
    isEdited: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    creatorId: string;
    creator?: Profile; // This is the important relation.
    // We're omitting favoritedBy for simplicity. You can include it if needed.
  };
  