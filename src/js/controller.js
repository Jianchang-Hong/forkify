import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // debugger;
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe

    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    console.log('query', query);
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// const controlAddBookmark = function () {
//   model.addBookmark(model.state.recipe);
//   console.log('add', model.state.recipe);
//   console.log(model.state.bookmarks);
//   recipeView.update(model.state.recipe);
// };

// const controlMinusBookmark = function () {
//   model.minusBookmark(model.state.recipe);
//   console.log('minus', model.state.recipe);
//   recipeView.update(model.state.recipe);
// };

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // console.log('add', model.state.recipe);
  // console.log(model.state.bookmarks);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
// const controlShowBookmark = function () {
//   console.log('bookmark', model.state.bookmarks);
//   if (!model.state.bookmarks.length) {
//     bookmarksView.renderMessage();
//   } else {
//     bookmarksView.render(model.state.bookmarks);
//   }
// };

const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    // 1) Show loading spinner
    addRecipeView.renderSpinner();
    // 2) Upload the new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // 3) Render recipe
    recipeView.render(model.state.recipe);

    // 4) Success message
    addRecipeView.renderMessage();

    // 5) Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // 6) Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // 5) Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  // recipeView.addHandlerBookmark(controlAddBookmark, controlMinusBookmark);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  // bookmarksView.addHandlerBookmarks(controlShowBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome!');
};

init();

const clearBookmarks = function (newRecipe) {
  console.log(newRecipe);
};
// clearBookmarks();
