import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  loading: false,
  isLogedIn: false,
  modalId: "",
  modalRecipe: {},
  error: [],
  allRecipes: [],
  myRecipes: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = recipeSlice.actions;

export default recipeSlice.reducer;

// const getRecipes = async () => {
//     dispatch({ type: "LOADING" });
//     try {
//         const recipes = await API.get(`/api/v1/recipes`);

//         console.log(recipes.data.data.recipe);

//         if (recipes) {
//             dispatch({
//                 type: "GET_RECIPES",
//                 payload: recipes.data.data.recipe,
//             });
//         }
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response });
//     }
// };

// const createRecipe = async (
//     recipe,
//     recipeTitle,
//     category,
//     prepTime,
//     shortDescription,
//     numberPeople,
//     author,
//     photo
// ) => {
//     try {
//         const newRecipe = await API.post(`/api/v1/recipes`, {
//             recipe,
//             recipeTitle,
//             category,
//             prepTime,
//             shortDescription,
//             numberPeople,
//             author,
//             photo,
//         });

//         if (newRecipe)
//             dispatch({
//                 type: "CREATE_RECIPE",
//                 payload: newRecipe.data.data.recipe,
//             });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error });
//     }
// };

// const getMyRecipes = async () => {
//     try {
//         const recipes = await API.get(`/api/v1/recipes/myrecipes`);
//         console.log("My Recipies=>>", recipes.data);
//         if (recipes)
//             dispatch({
//                 type: "GET_MY_RECIPES",
//                 payload: recipes.data.data.recipes,
//             });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const getRecipe = async (id) => {
//     try {
//         await API.get(`/api/v1/recipes/${id}`).then((recipe) => {
//             dispatch({
//                 type: "GET_RECIPE",
//                 payload: recipe.data.data.recipe,
//             });
//         });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const deleteRecipe = async (id) => {
//     try {
//         const deletedRecipe = await API.delete(`/api/v1/recipes/${id}`);

//         if (deletedRecipe) dispatch({ type: "DELETE_RECIPE", payload: id });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const updateRecipe = async (
//     id,
//     recipe,
//     recipeTitle,
//     category,
//     prepTime,
//     shortDescription,
//     numberPeople,
//     photo
// ) => {
//     try {
//         const updatedRecipe = await API.patch(`/api/v1/recipes/${id}`, {
//             recipe,
//             recipeTitle,
//             category,
//             prepTime,
//             shortDescription,
//             numberPeople,
//             photo,
//         });

//         if (updatedRecipe) {
//             dispatch({
//                 type: "UPDATE_RECIPE",
//                 payload: updatedRecipe.data,
//             });
//         }
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response });
//     }
// };
