import Search from "../Search/Search";
import { IoMdCloseCircle } from "react-icons/io";
import styles from './Fridge.module.css';

type FridgeProps = {
    ingredients: Array<Ingredient>
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

const Fridge = ({ingredients, setIngredients, setOffset}:FridgeProps) => {


    console.log('setoffset1', setOffset);

    const handleDelete = (selected:Ingredient) => {
        setIngredients(() => {
            return ingredients.filter(item => item !== selected)
        })
        setOffset(0);
    }

    return (
        <>
            <Search selected={ingredients} setSelected={setIngredients} setOffset={(value) => setOffset(value)}/>
            <ul className={styles.ingredients}>
                {ingredients.map(item => (
                    <li key={item.id} className={styles.ingredient}>
                        {item.name}
                        <button type='button' onClick={() => handleDelete(item)}><IoMdCloseCircle /></button>
                    </li>
                ))}     
            </ul>   
        
        </>
    )
}


export default Fridge;