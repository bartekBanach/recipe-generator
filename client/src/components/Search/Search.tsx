import React from 'react';
import { useState, useMemo } from 'react';
import styles from './Search.module.css';
import ingredients from '../../data/ingredients.ts';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';

type SearchProps = {
  selected: Array<Ingredient>;
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Search = ({ selected, setSelected, setOffset }: SearchProps) => {
  const [query, setQuery] = useState<string>('');
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const filteredIngredients = useMemo(() => {
    if (query === '') return [];
    else
      return ingredients.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
  }, [ingredients, query]);

  const handleClick = (value: Ingredient) => {
    if (!selected.includes(value)) {
      setSelected([...selected, value]);
    } else setSelected(() => selected.filter((item) => item !== value));

    setQuery('');
    setOffset(0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchbar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          {filteredIngredients.length !== 0 && (
            <ul className={styles.autocomplete}>
              {filteredIngredients.slice(0, 15).map((item) => (
                <li
                  key={item.id}
                  className={`${styles.option} ${
                    item.id === highlighted && styles.highlighted
                  }`}
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => setHighlighted(item.id)}
                >
                  {item.name}
                  {selected.includes(item) ? (
                    <FaCircleMinus />
                  ) : (
                    <FaCirclePlus />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
