import styles from './App.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Fridge from './components/Fridge/Fridge'

type Recipe = {
  id: number;
  image: string;
  title: string;
  sourceUrl: string;
  sourceName: string;
  missedIngredientCount: number;
  usedIngredientCount: number;
}
function App() {
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const getRecipes = async () => {

    const res = await axios.request({
      method: 'GET',
      url: 'http://localhost:4000/recipes',
      params: {ingredients: ingredients.map(item => item.name).join(','), offset: offset}   
    })
    console.log('offset', offset);
    console.log('ingredients', ingredients);
    if (offset === 0) setRecipes(res.data)
    else if (offset > 0) setRecipes((prev) => {
      return [...prev, ...res.data]
    })
    
  }

  useEffect(() => {
    getRecipes()
  }, [ingredients, offset])

  const loadMore = () => {
    setOffset((prev) => prev + 6)
  }

  return (
    <>
      <Fridge ingredients={ingredients} setIngredients={setIngredients} setOffset={(value) => setOffset(value)}/>
      <button onClick={() => getRecipes()}>Search recipes</button>
      <div className={styles.recipes}>
        {recipes && recipes.map(recipe => (
          <div key={recipe.id} className={styles.recipe}>
            <img src={recipe.image}/>
            <h3>{recipe.title}</h3>
            <h3>id: {recipe.id}</h3>
            <h4><a href={recipe.sourceUrl}>{recipe.sourceName}</a></h4>
            <div className={styles.counts}>
              <div className={styles.missed}><b>missed: {recipe.missedIngredientCount}</b></div>
              <div className={styles.used}><b>used: {recipe.usedIngredientCount}</b></div> 
            </div>
          </div>
        ))}
      <button type='button' className={styles.button} onClick={() => loadMore()}>More recipes</button>

      </div>


    </>
  )
}

export default App
