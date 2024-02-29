import Search from '../Search/Search';
import { IoMdCloseCircle } from 'react-icons/io';
import styles from './Fridge.module.css';
import essentialsList from '../../data/ingredientsEssential';
import ingredientsList from '../../data/ingredients';
import { FaCheck } from 'react-icons/fa6';
import { IoMdListBox } from 'react-icons/io';

type FridgeProps = {
  ingredients: Array<Ingredient>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  hidden: boolean;
};

const Fridge = ({
  ingredients,
  setIngredients,
  setOffset,
  hidden,
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
    setOffset(0);
  };

  const isChecked = (item: Ingredient) => {
    const found = ingredients.find((i) => i.id === item.id);
    return found ? true : false;
  };
  return (
    <div className={`${styles.container} ${hidden && styles.mobileHidden}`}>
      <h2>Ingredients</h2>
      <div className={styles.content}>
        <Search
          selected={ingredients}
          setSelected={setIngredients}
          setOffset={setOffset}
        />

        <div className={styles.gridWrapper}>
          <div className={styles.essentials}>
            <h3>Essential ingredients</h3>
            <div>
              {essentialsList.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.essential} ${
                    isChecked(item) && styles.checked
                  }`}
                  name={item.name}
                  onClick={() => handleChange(item)}
                >
                  {item.name}
                  {isChecked(item) && <FaCheck />}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.ingredients}>
            <h3>
              My ingredients <IoMdListBox className={styles.headingIcon} />
            </h3>

            {ingredients.length > 0 ? (
              <ul>
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
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noIngredientsMsg}>
                Oops! Your ingredients list is empty. Start by adding some
                ingredients to explore meals you can cook with them!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fridge;
