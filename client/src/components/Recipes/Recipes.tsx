import styles from './Recipes.module.css';
import Spinner from '../Spinner/Spinner.tsx';
import { FiExternalLink } from 'react-icons/fi';
import { useRef, useEffect } from 'react';
import { BiSolidError } from 'react-icons/bi';
import FiltersSection from '../FiltersSection/FiltersSection.tsx';

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
  const observerTarget = useRef<HTMLSpanElement>(null);
  const firstCallImminent = useRef<boolean>(true);
  const changeFilterAttribute = (
    value: Option[] | string,
    attribute: string,
  ) => {
    setFilters((prev) => ({ ...prev, [attribute]: value }));
    setOffset(0);
  };

  useEffect(() => {
    let observerTargetValue: HTMLSpanElement | null = null;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!firstCallImminent.current && hasMore) {
          setOffset((prev) => prev + 6);
        } else {
          firstCallImminent.current = false;
        }
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerTargetValue = observerTarget.current;
    }

    return () => {
      if (observerTargetValue) {
        observer.unobserve(observerTargetValue);
        firstCallImminent.current = true;
      }
    };
  }, [hasMore, firstCallImminent, observerTarget, setOffset]);

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
          {recipes?.map((recipe) => (
            <div key={recipe.id} className={styles.recipe}>
              <div className={styles.recipeImg}>
                <img src={recipe.image} />
              </div>

              <div className={styles.recipeContent}>
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
            </div>
          ))}
          <span className={styles.observerTarget} ref={observerTarget}></span>

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
    </div>
  );
};

export default Recipes;
