import Search from '../Search/Search';
import { IoMdCloseCircle } from 'react-icons/io';
import styles from './Fridge.module.css';
import essentialsList from '../../data/ingredientsEssential';
import ingredientsList from '../../data/ingredients';
import { useState } from 'react';

type FridgeProps = {
  ingredients: Array<Ingredient>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const Fridge = ({
  ingredients,
  setIngredients,
  setOffset,
  filters,
  setFilters,
}: FridgeProps) => {
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
  console.log('INGREDIENTS LIST', ingredients);
  return (
    <>
      <Search
        selected={ingredients}
        setSelected={setIngredients}
        setOffset={setOffset}
        filters={filters}
        setFilters={setFilters}
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
            {item.name}
            <button
              type="button"
              onClick={() => handleDelete(item)}
              className={styles.deleteBtn}
            >
              <IoMdCloseCircle className={styles.deleteIcn} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Fridge;
