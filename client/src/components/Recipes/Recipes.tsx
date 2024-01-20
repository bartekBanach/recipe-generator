import styles from './Recipes.module.css';
import cuisines from '../../data/cuisines.ts';
import mealTypes from '../../data/mealTypes.ts';
import intolerances from '../../data/intolerances.ts';
import diets from '../../data/diets.ts';
import MultiSelect from '../Multiselect/Multiselect.tsx';
import Spinner from '../Spinner/Spinner.tsx';

type RecipesProps = {
  recipes: Recipe[];
  loading: boolean;
  error: boolean;
  total: number | null;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
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
}: RecipesProps) => {
  const changeFilterAttribute = (value: Option[], attribute: string) => {
    setFilters((prev) => ({ ...prev, [attribute]: value }));
    setOffset(0);
  };
  const loadMore = () => {
    setOffset((prev) => prev + 3);
  };

  /*if (loading && offset === 0)
    return (
      <>
        <Spinner text="Loading results..." display="absolute" />
      </>
    );*/
  if (error) return <>Couldnt't load recipes due to network error</>;
  return (
    <div className={styles.container}>
      <h2>Recipes</h2>
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
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe.id} className={styles.recipe}>
              <img className={styles.recipeImg} src={recipe.image} />
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
      </div>

      {total && recipes.length + 3 <= total ? (
        <div className={styles.moreResults}>
          <button
            type="button"
            className={styles.moreButton}
            onClick={() => loadMore()}
            disabled={loading && offset > 0}
          >
            {loading && offset > 0 ? 'Loading...' : 'More recipes'}
          </button>
          {loading && offset > 0 && <Spinner size="small" />}
        </div>
      ) : (
        <>No more recipes to load.</>
      )}
    </div>
  );
};

export default Recipes;
