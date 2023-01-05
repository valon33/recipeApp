import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipes/recipeSlice";
import utilReducer from "../features/util/utilSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    util: utilReducer,
    auth: authReducer,
  },
});
