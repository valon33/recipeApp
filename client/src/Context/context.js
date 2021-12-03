import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/reducer";
import axios from "axios";

const AppContext = React.createContext();

const initialState = {
  isModalOpen: false,
  loading: false,
  isLogedIn: false,
  modalId: "",
  error: [],
  currentUser: {},
  allRecipes: [],
  myRecipes: [],
  currentRecipe: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // *RECIPIES FUNCTIONS
  const getRecipes = async () => {
    try {
      const recipes = await axios.get("http://127.0.0.1:5000/api/v1/recipes");

      console.log(recipes.data.data.recipe);

      dispatch({ type: "LOADING" });
      if (recipes) {
        dispatch({
          type: "GET_RECIPES",
          payload: recipes.data.data.recipe,
        });
      }
    } catch (error) {
      // dispatch({ type: "ERROR", payload: error.response.data.message });
      dispatch({ type: "ERROR", payload: error.response });
    }
  };

  const createRecipe = async (
    recipe,
    recipeTitle,
    category,
    prepTime,
    shortDescription,
    numberPeople,
    author,
    photo
  ) => {
    try {
      const newRecipe = await axios.post("/api/v1/recipes", {
        recipe,
        recipeTitle,
        category,
        prepTime,
        shortDescription,
        numberPeople,
        author,
        photo,
      });
      console.log("new Recipe=>", newRecipe.data.data.recipe);

      if (newRecipe)
        dispatch({
          type: "CREATE_RECIPE",
          payload: newRecipe.data.data.recipe,
        });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const getMyRecipes = async () => {
    try {
      const recipes = await axios.get("/api/v1/recipes/myrecipes");
      console.log("My Recipies=>>", recipes.data);
      if (recipes)
        dispatch({
          type: "GET_MY_RECIPES",
          payload: recipes.data.data.recipes,
        });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const getRecipe = async (id) => {
    try {
      // const recipe = await axios.get(`/api/v1/recipes/${id}`).then((recipe) => {
      await axios.get(`/api/v1/recipes/${id}`).then((recipe) => {
        dispatch({ type: "GET_RECIPE", payload: recipe.data.data.recipe });
      });
      // console.log("haj ne k", recipe);
      // if (recipe) {
      //   dispatch({ type: "GET_RECIPE", payload: recipe.data.data.recipe });
      // }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const deletedRecipe = await axios.delete(`/api/v1/recipes/${id}`);

      if (deletedRecipe) dispatch({ type: "DELETE_RECIPE", payload: id });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  // *USER FUNCTIONS

  const login = async (email, password) => {
    try {
      const user = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("From the Context current User", user.data.data.user);
      if (user) dispatch({ type: "LOGIN", payload: user.data.data.user });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const signUp = async ({
    name,
    lastName,
    email,
    password,
    passwordConfirm,
    birthDay,
  }) => {
    const date = new Date(birthDay);
    try {
      const newUser = await axios.post("/api/v1/users/signup", {
        name,
        lastName,
        email,
        password,
        passwordConfirm,
        date,
      });
      if (newUser)
        dispatch({ type: "SIGNUP", payload: newUser.data.data.user });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const logOut = async () => {
    await axios.get("/api/v1/users/logout");
    dispatch({ type: "LOGOUT" });
  };

  const currentUser = async () => {
    try {
      const user = await axios.get("/api/v1/users/currentuser");
      if (user) dispatch({ type: "CURRENT_USER", payload: user.data.user });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  // *UTIL FUNCTIONS

  const uploadPhoto = async (selectedPhoto) => {
    try {
      const data = new FormData();
      data.append("photo", selectedPhoto);

      const photo = await axios.post("/api/v1/upload", data);

      if (photo) {
        dispatch({ type: "UPLOAD_PHOTO" });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const openModal = (id) => {
    dispatch({ type: "OPEN_MODAL", payload: id });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => {
    window.addEventListener("load", currentUser);
    return () => {
      window.removeEventListener("load", currentUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getRecipes,
        openModal,
        closeModal,
        signUp,
        login,
        logOut,
        createRecipe,
        getMyRecipes,
        getRecipe,
        deleteRecipe,
        uploadPhoto,
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
