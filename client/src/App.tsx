import styles from './App.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fridge from './components/Fridge/Fridge';
import dummyData from './data/dummyData';
import Recipes from './components/Recipes/Recipes';
import sleep from './utilities/sleep';
import { IoRestaurant } from 'react-icons/io5';

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

  const [display, setDisplay] = useState('ingredients');

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

  const getDummyData = async () => {
    setLoading(true);

    try {
      await sleep(1000);
      if (offset === 0) setRecipes(dummyData.slice(0, 3));
      else if (offset > 0)
        setRecipes((prev) => [...prev, ...dummyData.slice(offset, offset + 3)]);
      setTotal(60);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //getRecipes();

    //Use dummy data instead
    getDummyData();
  }, [ingredients, filters, offset]);

  const handleChange = () => {
    setDisplay((prev) => {
      if (prev === 'ingredients') {
        return 'recipes';
      } else {
        return 'ingredients';
      }
    });
  };

  console.log('dipslay', display);

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        Recipe's generator <IoRestaurant />{' '}
      </h1>

      <div className={styles.gridWrapper}>
        <Fridge
          ingredients={ingredients}
          setIngredients={setIngredients}
          setOffset={setOffset}
          hidden={display === 'recipes'}
        />
        <Recipes
          recipes={recipes}
          loading={loading}
          error={error}
          total={total}
          offset={offset}
          setOffset={setOffset}
          filters={filters}
          setFilters={setFilters}
          hidden={display === 'ingredients'}
        />
      </div>
      <div className={styles.mobileControlls}>
        <div className={styles.control}>
          <input
            name="controlls"
            type="radio"
            id="ingredients"
            checked={display === 'ingredients'}
            onChange={handleChange}
          />
          <label htmlFor="ingredients">Ingredients</label>
        </div>

        <div className={styles.control}>
          <input
            name="controlls"
            type="radio"
            checked={display === 'recipes'}
            onChange={handleChange}
          />
          <label htmlFor="recipes">Recipes</label>
        </div>
      </div>
    </div>
  );
}

export default App;
