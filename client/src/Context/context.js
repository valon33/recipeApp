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

  // *USER FUNCTIONS

  const login = async (email, password) => {
    try {
      const user = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("From the Context current User", user.data);
      if (user) dispatch({ type: "LOGIN", payload: user.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  const currentUser = async () => {
    try {
      const user = await axios.get("/api/v1/users/currentuser");
      console.log("current user =>", user.data);
      if (user) dispatch({ type: "CURRENT_USER", payload: user.data });
    } catch (error) {
      //   console.log("curent user error ===>", error.response.statusText);
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  };

  // *UTIL FUNCTIONS

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
        login,
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
