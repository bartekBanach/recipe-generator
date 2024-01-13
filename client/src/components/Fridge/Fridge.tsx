import Search from '../Search/Search';
import { IoMdCloseCircle } from 'react-icons/io';
import styles from './Fridge.module.css';

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

  return (
    <>
      <Search
        selected={ingredients}
        setSelected={setIngredients}
        setOffset={setOffset}
        filters={filters}
        setFilters={setFilters}
      />
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
