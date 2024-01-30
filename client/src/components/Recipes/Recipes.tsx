import styles from './Recipes.module.css';
import cuisines from '../../data/cuisines.ts';
import mealTypes from '../../data/mealTypes.ts';
import intolerances from '../../data/intolerances.ts';
import diets from '../../data/diets.ts';
import MultiSelect from '../Multiselect/Multiselect.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import { FiExternalLink } from 'react-icons/fi';
import { useRef, useEffect } from 'react';

type RecipesProps = {
  recipes: Recipe[];
  loading: boolean;
  error: boolean;
  total: number | null;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  hidden: boolean;
  refetch: any;
  hasMore: boolean;
};

const Recipes = ({
  recipes,
  loading,
  error,
  total,
  offset,
  setOffset,
  filters,
  setFilters,
  hidden,
  refetch,
  hasMore,
}: RecipesProps) => {
  const observerTarget = useRef(null);

  const firstCallImminent = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!firstCallImminent.current && hasMore) {
          fetchMore();
        } else {
          firstCallImminent.current = false;
        }
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
        firstCallImminent.current = true;
      }
    };
  }, [hasMore, firstCallImminent, observerTarget]);

  const changeFilterAttribute = (value: Option[], attribute: string) => {
    setFilters((prev) => ({ ...prev, [attribute]: value }));
    setOffset(0);
  };
  const fetchMore = () => {
    setOffset((prev) => {
      return prev + 3;
    });
  };

  if (error) return <>Couldnt't load recipes due to network error</>;
  return (
    <div className={`${styles.container} ${hidden && styles.mobileHidden}`}>
      <h2>Recipes</h2>

      <div className={styles.content}>
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
        {loading && offset === 0 && <Spinner text="" display="absolute" />}
        <div
          className={`${styles.recipes} ${
            loading && offset === 0 && styles.loading
          }`}
        >
          {recipes?.map((recipe) => {
            return (
              <div key={recipe.id} className={styles.recipe}>
                <img className={styles.recipeImg} src={recipe.image} />
                <a href={recipe.sourceUrl} className={styles.recipeName}>
                  {recipe.title} <FiExternalLink />
                </a>

                <div className={styles.counts}>
                  <div className={styles.missed}>
                    <b>missed: {recipe.missedIngredientCount}</b>
                  </div>
                  <div className={styles.used}>
                    <b>used: {recipe.usedIngredientCount}</b>
                  </div>
                </div>
              </div>
            );
          })}
          <span className={styles.observerTarget} ref={observerTarget}></span>
          {hasMore && recipes.length > 0 ? (
            <div className={styles.moreResults}>
              <button
                type="button"
                className={styles.moreButton}
                onClick={() => fetchMore()}
                disabled={loading && offset > 0}
              >
                {loading && offset > 0 ? 'Loading...' : 'More recipes'}
              </button>
              {loading && offset > 0 && <Spinner size="small" />}
            </div>
          ) : (
            <>{!loading && 'No more recipes to load.'}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
