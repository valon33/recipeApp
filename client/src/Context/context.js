import React, { state, useContext, useReducer, useEffect } from "react";
import API from "../http";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = React.createContext();

const initialState = {
  isModalOpen: false,
  loading: false,
  isLogedIn: false,
  modalId: "",
  modalRecipe: {},
  error: [],
  currentUser: {},
  allRecipes: [],
  myRecipes: [],
  currentRecipe: [],
  recipeLikes: "",
};

const AppProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken, removeToken] = useLocalStorage("token", null);

  //   const createRecipe = async (
  //     recipe,
  //     recipeTitle,
  //     category,
  //     prepTime,
  //     shortDescription,
  //     numberPeople,
  //     author,
  //     photo
  //   ) => {
  //     try {
  //       const newRecipe = await API.post(`/api/v1/recipes`, {
  //         recipe,
  //         recipeTitle,
  //         category,
  //         prepTime,
  //         shortDescription,
  //         numberPeople,
  //         author,
  //         photo,
  //       });

  //       if (newRecipe)
  //         dispatch({
  //           type: "CREATE_RECIPE",
  //           payload: newRecipe.data.data.recipe,
  //         });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error });
  //     }
  //   };

  //   const getMyRecipes = async () => {
  //     try {
  //       const recipes = await API.get(`/api/v1/recipes/myrecipes`);
  //       console.log("My Recipies=>>", recipes.data);
  //       if (recipes)
  //         dispatch({
  //           type: "GET_MY_RECIPES",
  //           payload: recipes.data.data.recipes,
  //         });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const getRecipe = async (id) => {
  //     try {
  //       await API.get(`/api/v1/recipes/${id}`).then((recipe) => {
  //         dispatch({
  //           type: "GET_RECIPE",
  //           payload: recipe.data.data.recipe,
  //         });
  //       });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const deleteRecipe = async (id) => {
  //     try {
  //       const deletedRecipe = await API.delete(`/api/v1/recipes/${id}`);

  //       if (deletedRecipe) dispatch({ type: "DELETE_RECIPE", payload: id });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const updateRecipe = async (
  //     id,
  //     recipe,
  //     recipeTitle,
  //     category,
  //     prepTime,
  //     shortDescription,
  //     numberPeople,
  //     photo
  //   ) => {
  //     try {
  //       const updatedRecipe = await API.patch(`/api/v1/recipes/${id}`, {
  //         recipe,
  //         recipeTitle,
  //         category,
  //         prepTime,
  //         shortDescription,
  //         numberPeople,
  //         photo,
  //       });

  //       if (updatedRecipe) {
  //         dispatch({
  //           type: "UPDATE_RECIPE",
  //           payload: updatedRecipe.data,
  //         });
  //       }
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response });
  //     }
  //   };

  // *USER FUNCTIONS

  //   const signUp = async ({
  //     name,
  //     lastName,
  //     email,
  //     password,
  //     passwordConfirm,
  //     birthDay,
  //   }) => {
  //     const date = new Date(birthDay);
  //     try {
  //       const newUser = await API.post(`/api/v1/users/signup`, {
  //         name,
  //         lastName,
  //         email,
  //         password,
  //         passwordConfirm,
  //         date,
  //       });
  //       if (newUser)
  //         dispatch({ type: "SIGNUP", payload: newUser.data.data.user });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const updateUser = async (
  //     id,
  //     name,
  //     email,
  //     lastName,
  //     birthday,
  //     password,
  //     passwordConfirm,
  //     photo
  //   ) => {
  //     try {
  //       let updateUser;
  //       if (!password && !passwordConfirm && !photo) {
  //         updateUser = await API.patch(`/api/v1/users/${id}`, {
  //           name,
  //           email,
  //           lastName,
  //           birthday,
  //         });
  //       } else if (!password && !passwordConfirm && photo) {
  //         updateUser = await API.patch(`/api/v1/users/${id}`, {
  //           name,
  //           email,
  //           lastName,
  //           birthday,
  //           photo,
  //         });
  //       } else if (password && !photo) {
  //         updateUser = await API.patch(`/api/v1/users/${id}`, {
  //           name,
  //           email,
  //           lastName,
  //           birthday,
  //           password,
  //           passwordConfirm,
  //         });
  //       } else if (password && passwordConfirm && photo) {
  //         updateUser = await API.patch(`/api/v1/users/${id}`, {
  //           name,
  //           email,
  //           lastName,
  //           birthday,
  //           password,
  //           passwordConfirm,
  //           photo,
  //         });
  //       }

  //       if (updateUser) {
  //         dispatch({
  //           type: "UPDATE_USER",
  //           payload: updateUser.data,
  //         });
  //       }
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const currentUser = async () => {
  //     try {
  //       const user = await API.get(`/api/v1/users/currentuser`);
  //       if (user) dispatch({ type: "CURRENT_USER", payload: user.data.user });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   // *UTIL FUNCTIONS

  //   const uploadPhoto = async (selectedPhoto) => {
  //     try {
  //       const data = new FormData();
  //       data.append("photo", selectedPhoto);

  //       const photo = await API.post(`/api/v1/upload`, data);

  //       if (photo) {
  //         dispatch({ type: "UPLOAD_PHOTO" });
  //       }
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const likeRecipe = async (id) => {
  //     try {
  //       await API.post(`/api/v1/recipes/like/${id}`).then((recipe) => {
  //         dispatch({
  //           type: "LIKE_RECIPE",
  //           payload: recipe.data.data.recipe.likes,
  //         });
  //       });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const unlikeRecipe = async (id) => {
  //     try {
  //       await API.post(`/api/v1/recipes/unlike/${id}`).then((recipe) =>
  //         dispatch({
  //           type: "UNLIKE_RECIPE",
  //           payload: recipe.data.data.recipe.likes,
  //         })
  //       );
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error.response.data.message });
  //     }
  //   };

  //   const openModal = (id) => {
  //     dispatch({ type: "OPEN_MODAL", payload: id });
  //   };

  //   const closeModal = () => {
  //     dispatch({ type: "CLOSE_MODAL" });
  //   };
  //   const clearError = () => {
  //     dispatch({ type: "CLEAR_ERROR" });
  //   };

  //   useEffect(() => {
  //     currentUser();
  //   }, []);

  //   useEffect(() => {
  //     getRecipes();
  //   }, [state.recipeLikes, state.myRecipes]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        // getRecipes,
        // openModal,
        // closeModal,
        // signUp,
        // login,
        // logOut,
        // updateUser,
        // createRecipe,
        // getMyRecipes,
        // getRecipe,
        // deleteRecipe,
        // updateRecipe,
        // uploadPhoto,
        // likeRecipe,
        // unlikeRecipe,
        // clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
