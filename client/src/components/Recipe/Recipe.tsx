import React from 'react';
import styles from './Recipe.module.css';
import { FiExternalLink } from 'react-icons/fi';

type RecipeProps = {
  recipe: Recipe;
};

const Recipe = React.forwardRef(
  ({ recipe }: RecipeProps, ref: React.Ref<HTMLDivElement>) => {
    console.log('ref type', typeof ref);
    console.log('ref ', ref);

    const recipeBody = (
      <>
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
      </>
    );
    const content = ref ? (
      <div ref={ref} className={styles.recipe}>
        {recipeBody}
      </div>
    ) : (
      <div className={styles.recipe}>{recipeBody}</div>
    );
    return content;
  },
);

export default Recipe;
