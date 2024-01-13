import React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import styles from './Search.module.css';
import ingredients from '../../data/ingredients.ts';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

type SearchProps = {
  selected: Array<Ingredient>;
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Search = ({ selected, setSelected, setOffset }: SearchProps) => {
  const [query, setQuery] = useState<string>('');
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const autocompleteRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(autocompleteRef, () => setOpen(false));

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
    //setOpen(false);
    setOffset(0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchbar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
          ></input>
          {filteredIngredients.length !== 0 && open && (
            <ul className={styles.autocomplete} ref={autocompleteRef}>
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
