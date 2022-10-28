import React from 'react';

function RecipeInProgress() {
  return (
    <div>
      <img alt="recipe" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Title</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h2 data-testid="recipe-category">Category</h2>
      <p data-testid="instructions">Instructions</p>
      <button data-testid="finish-recipe-btn" type="button">Finish</button>
    </div>
  );
}

export default RecipeInProgress;
