export interface CreateRecipeDto {
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineType: string;
  preparationTime: number;
  status: string;
}
