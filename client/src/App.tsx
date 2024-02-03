import styles from './App.module.css';
import { useState } from 'react';
import Fridge from './components/Fridge/Fridge';
import Recipes from './components/Recipes/Recipes';
import { IoRestaurant } from 'react-icons/io5';
import useFetchRecipes from './hooks/useFetchRecipes';

function App() {
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [offset, setOffset] = useState<number>(0);

  const [filters, setFilters] = useState<Filters>({
    cuisines: [],
    diets: [],
    intolerances: [],
    mealType: '',
  });
  const {
    results: recipes,
    loading,
    error,
    hasMore,
  } = useFetchRecipes({
    filters,
    ingredients,
    offset,
  });

  const [display, setDisplay] = useState('ingredients');

  const handleChange = () => {
    setDisplay((prev) => {
      if (prev === 'ingredients') {
        return 'recipes';
      } else {
        return 'ingredients';
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        Recipes Generator <IoRestaurant />{' '}
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
          offset={offset}
          setOffset={setOffset}
          filters={filters}
          setFilters={setFilters}
          hidden={display === 'ingredients'}
          hasMore={hasMore}
        />
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
              id="recipes"
              type="radio"
              checked={display === 'recipes'}
              onChange={handleChange}
            />

            <label htmlFor="recipes">Recipes</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
