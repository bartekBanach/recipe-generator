import styles from './Recipes.module.css';

type RecipesProps = {
  recipes: Recipe[];
  loading: boolean;
  error: boolean;
  total: number | null;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Recipes = ({
  recipes,
  loading,
  error,
  total,
  offset,
  setOffset,
}: RecipesProps) => {
  const loadMore = () => {
    setOffset((prev) => prev + 3);
  };

  if (loading) return <>Loading results...</>;
  if (error) return <>Couldnt't load recipes due to network error</>;
  return (
    <div className={styles.container}>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipe}>
            <img src={recipe.image} />
            <h3>{recipe.title}</h3>
            <h3>id: {recipe.id}</h3>
            <h4>
              <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
            </h4>
            <div className={styles.counts}>
              <div className={styles.missed}>
                <b>missed: {recipe.missedIngredientCount}</b>
              </div>
              <div className={styles.used}>
                <b>used: {recipe.usedIngredientCount}</b>
              </div>
            </div>
          </div>
        ))}
      {total && recipes.length + 3 <= total ? (
        <button
          type="button"
          className={styles.moreButton}
          onClick={() => loadMore()}
        >
          More recipes
        </button>
      ) : (
        <>No more recipes to load.</>
      )}
    </div>
  );
};

export default Recipes;
