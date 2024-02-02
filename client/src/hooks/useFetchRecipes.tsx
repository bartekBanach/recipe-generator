import axios from 'axios';
import { useState, useEffect } from 'react';
import sleep from '../utilities/sleep';
import dummyData from '../data/dummyData';

type useFetchRecipesProps = {
  offset: number;
  ingredients: Ingredient[];
  filters: Filters;
};

export default function useFetchRecipes({
  offset,
  ingredients,
  filters,
}: useFetchRecipesProps) {
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getDummyData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await sleep(1000);
      if (offset === 0) setResults(dummyData.slice(0, 9));
      else if (offset > 0)
        setResults((prev) => [...prev, ...dummyData.slice(offset, offset + 3)]);
      if (results.length + 3 >= 18) setHasMore(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecipes = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await axios.request({
        method: 'GET',
        url: 'http://localhost:4000/recipes',
        params: {
          ingredients: ingredients.map((item) => item.name).join(','),
          offset: offset,
          cuisine: filters.cuisines.map((item) => item.name).join(','),
          diet: filters.diets.map((item) => item.name).join(','),
          intolerances: filters.intolerances.map((item) => item.name).join(','),
          type: filters.mealType,
        },
      });
      if (offset === 0) setResults(res.data.results);
      else setResults((prev) => [...prev, ...res.data.results]);
      if (res.data.results >= res.data.totalResults) setHasMore(false);
    } catch (err) {
      console.log('ERROR', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDummyData();
  }, [offset, ingredients, filters]);

  return { results, loading, error, hasMore };
}