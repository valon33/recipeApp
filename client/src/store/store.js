import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipes/recipeSlice";
import userReducer from "../features/user/userSlice";
import utilReducer from "../features/util/utilSlice";

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        user: userReducer,
        util: utilReducer,
    },
});
