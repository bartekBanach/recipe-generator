import Search from '../Search/Search';
import { IoMdCloseCircle } from 'react-icons/io';
import styles from './Fridge.module.css';
import essentialsList from '../../data/ingredientsEssential';
import ingredientsList from '../../data/ingredients';

type FridgeProps = {
  ingredients: Array<Ingredient>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Fridge = ({ ingredients, setIngredients, setOffset }: FridgeProps) => {
  const handleDelete = (selected: Ingredient) => {
    setIngredients(() => {
      return ingredients.filter((item) => item !== selected);
    });
    setOffset(0);
  };

  const handleChange = (item: Ingredient) => {
    const found = ingredientsList.find((i) => i.id === item.id);

    if (found) {
      if (ingredients.includes(found)) {
        setIngredients(ingredients.filter((i) => i.id !== item.id));
      } else {
        setIngredients((prev) => [...prev, found]);
      }
    }

    /*if (ingredients.includes(item)) {
      setIngredients(ingredients.filter((i) => i.id !== item.id));
    } else {
      setIngredients((prev) => [...prev, item]);
    }*/
  };

  const check = (item: Ingredient) => {
    const found = ingredients.find((i) => i.id === item.id);
    return found ? true : false;
  };
  return (
    <div className={styles.container}>
      <h2>Ingredients</h2>

      <Search
        selected={ingredients}
        setSelected={setIngredients}
        setOffset={setOffset}
      />
      <h3>Essential ingredients</h3>

      <div className={styles.essentials}>
        {essentialsList.map((item) => (
          <button
            key={item.id}
            className={`${styles.essential} ${check(item) && styles.checked}`}
            name={item.name}
            onClick={() => handleChange(item)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <ul className={styles.ingredients}>
        {ingredients.map((item) => (
          <li key={item.id} className={styles.ingredient}>
            <div className={styles.ingredientHeader}>
              {item.name}
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className={styles.deleteBtn}
              >
                <IoMdCloseCircle className={styles.deleteIcn} />
              </button>
            </div>

            <img className={styles.ingredientImg} 
            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.name.replace(' ', '-')}.jpg`}></img>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fridge;
