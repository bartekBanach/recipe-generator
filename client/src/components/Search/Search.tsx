import React from 'react';
import { useState, useMemo } from 'react';
import styles from './Search.module.css';
import ingredients from '../../data/ingredients.ts';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import cuisines from '../../data/cuisines.ts';
import mealTypes from '../../data/mealTypes.ts';
import intolerances from '../../data/intolerances.ts';
import diets from '../../data/diets.ts';
import MultiSelect from '../Multiselect/Multiselect.tsx';

type SearchProps = {
  selected: Array<Ingredient>;
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const Search = ({
  selected,
  setSelected,
  setOffset,
  filters,
  setFilters,
}: SearchProps) => {
  const [query, setQuery] = useState<string>('');
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [filterCuisines, setFilterCuisines] = useState<Option[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  const changeFilterAttribute = (value: Option[], attribute: string) => {
    setFilters((prev) => ({ ...prev, [attribute]: value }));
  };

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

        <div className={styles.filters}>
          <MultiSelect
            options={cuisines}
            value={filters.cuisines}
            placeholder="cuisine"
            onChange={(value) => changeFilterAttribute(value, 'cuisines')}
          />
          <MultiSelect
            options={diets}
            value={filters.diets}
            placeholder="diets"
            onChange={(value) => changeFilterAttribute(value, 'diets')}
          />
          <MultiSelect
            options={intolerances}
            value={filters.intolerances}
            placeholder="intolerances"
            onChange={(value) => changeFilterAttribute(value, 'intolerances')}
          />

          <select
            value={filters.mealType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, mealType: e.target.value }))
            }
          >
            <option value="">meal type</option>
            {mealTypes.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Search;
