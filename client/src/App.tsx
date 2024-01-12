import styles from './App.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fridge from './components/Fridge/Fridge';
import dummyData from './data/dummyData';

function App() {
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number | null>(null);

  const [filters, setFilters] = useState<Filters>({
    cuisines: [],
    diets: [],
    intolerances: [],
    mealType: '',
  });

  const getRecipes = async () => {
    setLoading(true);
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

      if (offset === 0) setRecipes(res.data.results);
      else if (offset > 0)
        setRecipes((prev) => {
          return [...prev, ...res.data.results];
        });
      setTotal(res.data.totalResults);
    } catch (err) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();

    //Use dummy data instead
    /*if (offset === 0) setRecipes(dummyData.slice(0, 3));
    else if (offset > 0)
      setRecipes((prev) => [...prev, ...dummyData.slice(offset, offset + 3)]);
    setTotal(60);*/
  }, [ingredients, filters, offset]);

  const loadMore = () => {
    setOffset((prev) => prev + 3);
  };

  if (loading) return <>Loading results...</>;
  if (error) return <>Couldnt't load recipes due to network error</>;

  return (
    <>
      <Fridge
        ingredients={ingredients}
        setIngredients={setIngredients}
        setOffset={setOffset}
        filters={filters}
        setFilters={setFilters}
      />
      <button onClick={() => getRecipes()}>Search recipes</button>
      <div className={styles.recipes}>
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe.id} className={styles.recipe}>
              <img src={recipe.image} />
              <h3>{recipe.title}</h3>
              <h3>id: {recipe.id}</h3>
              <h4>
                <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
              </h4>
              <div className={styles.counts}>
                <div className={styles.missed}>
                  <b>missed: {recipe.missedIngredientCount}</b>
                </div>
                <div className={styles.used}>
                  <b>used: {recipe.usedIngredientCount}</b>
                </div>
              </div>
            </div>
          ))}
        {total && recipes.length + 3 <= total ? (
          <button
            type="button"
            className={styles.moreButton}
            onClick={() => loadMore()}
          >
            More recipes
          </button>
        ) : (
          <>No more recipes to load.</>
        )}
      </div>
    </>
  );
}

export default App;
