type Ingredient = {
    id: number;
    api_id: string;
    name: string;
}

type Recipe = {
    id: number;
    image: string;
    title: string;
    sourceUrl: string;
    sourceName: string;
    missedIngredientCount: number;
    usedIngredientCount: number;
};


type Option = {
    id: number;
    name: string;
}

type Filters = {
    cuisines: Option[],
    diets: Option[],
    intolerances: Option[],
    mealType: string,
  }