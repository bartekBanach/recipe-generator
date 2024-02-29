import React from 'react';
import cuisines from '../../data/cuisines.ts';
import mealTypes from '../../data/mealTypes.ts';
import intolerances from '../../data/intolerances.ts';
import diets from '../../data/diets.ts';
import MultiSelect from '../MultiSelect/MultiSelect.tsx';
import styles from './FiltersSection.module.css';

type FiltersSectionProps = {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FiltersSection({
  filters,
  setFilters,
  setOffset,
}: FiltersSectionProps) {
  const changeFilterAttribute = (
    value: Option[] | string,
    attribute: string,
  ) => {
    setFilters((prev) => ({ ...prev, [attribute]: value }));
    setOffset(0);
  };
  return (
    <div className={styles.filters}>
      <MultiSelect
        options={cuisines}
        value={filters.cuisines}
        placeholder="cuisine"
        onChange={(value: Option[]) => changeFilterAttribute(value, 'cuisines')}
      />
      <MultiSelect
        options={diets}
        value={filters.diets}
        placeholder="diets"
        onChange={(value: Option[]) => changeFilterAttribute(value, 'diets')}
      />
      <MultiSelect
        options={intolerances}
        value={filters.intolerances}
        placeholder="allergies"
        onChange={(value: Option[]) =>
          changeFilterAttribute(value, 'intolerances')
        }
      />

      <select
        value={filters.mealType}
        onChange={(e) => changeFilterAttribute(e.target.value, 'mealType')}
      >
        <option value="">meal type</option>
        {mealTypes.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
