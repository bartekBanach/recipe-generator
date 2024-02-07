import styles from './Recipes.module.css';
import Spinner from '../Spinner/Spinner.tsx';
import { useRef, useCallback } from 'react';
import { BiSolidError } from 'react-icons/bi';
import FiltersSection from '../FiltersSection/FiltersSection.tsx';
import Recipe from '../Recipe/Recipe.tsx';

type RecipesProps = {
  recipes: Recipe[];
  loading: boolean;
  error: boolean;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  hidden: boolean;
  hasMore: boolean;
};

const Recipes = ({
  recipes,
  loading,
  error,
  offset,
  setOffset,
  filters,
  setFilters,
  hidden,
  hasMore,
}: RecipesProps) => {
  const intObserver = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (recipe: HTMLDivElement) => {
      if (loading) return;

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + 6);
        }
      });

      if (recipe) intObserver.current.observe(recipe);
    },
    [loading, hasMore, setOffset],
  );

  if (error)
    return (
      <div className={`${styles.container} ${hidden && styles.mobileHidden}`}>
        <h2>Recipes</h2>
        <div className={styles.error}>
          <BiSolidError />
          <p>Couldn't load recipes due to network error.</p>
        </div>
      </div>
    );

  return (
    <div className={`${styles.container} ${hidden && styles.mobileHidden}`}>
      <h2>Recipes</h2>

      <div className={styles.content}>
        <FiltersSection
          filters={filters}
          setFilters={setFilters}
          setOffset={setOffset}
        />

        {loading && offset === 0 && (
          <Spinner text="Loading recipes..." display="absolute" />
        )}
        <div
          className={`${styles.recipes} ${
            loading && offset === 0 && styles.loading
          }`}
        >
          {recipes?.map((recipe, i) => {
            if (i + 1 === recipes.length) {
              return (
                <Recipe key={recipe.id} ref={lastElementRef} recipe={recipe} />
              );
            }
            return <Recipe key={recipe.id} recipe={recipe} />;
          })}
        </div>
        {hasMore ? (
          <div className={styles.moreResults}>
            {offset > 0 && (
              <div className={styles.loadingAnimation}>
                <Spinner size="small" />

                <div className={styles.loadingText}>
                  Loading<span className={styles.loadingDots}>....</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className={styles.communicat}>No more recipes to load.</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
