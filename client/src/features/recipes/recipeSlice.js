import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../http";
import _ from "lodash";
const baseUrl = "http://localhost:5000";

export const getRecipes = createAsyncThunk("recipe/getrecipes", async () => {
  return await API.get(`/api/v1/recipes`);
});

export const createRecipe = createAsyncThunk(
  "recipe/createrecipe",
  async (recipe) => {
    return await API.post(`/api/v1/recipes`, { ...recipe });
  }
);

export const getRecipe = createAsyncThunk("recipe/getrecipe", async (id) => {
  return await API.get(`/api/v1/recipes/${id}`);
});

export const getMyRecipes = createAsyncThunk(
  "recipe/getmyrecipes",
  async () => {
    return await API.get(`/api/v1/recipes/myrecipes`);
  }
);

export const updateRecipe = createAsyncThunk(
  "recipe/updaterecipe",
  async (recipe) => {
    return await API.patch(`/api/v1/recipes/${recipe.id}`, {
      ...recipe,
    });
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleterecipe",
  async (id) => {
    return await API.delete(`/api/v1/recipes/${id}`);
  }
);

const initialState = {
  loading: false,
  allRecipes: [],
  myRecipes: [],
  recipe: {},
  createdRecipe: {},
  error: [],
  newestRecipes: [],
  mostLikedRecipes: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    mostLiked: (state) => {
      state.mostLikedRecipes = _.sortBy(state?.allRecipes, ["likes"]).reverse();
    },
    newest: (state) => {
      state.newestRecipes = _.sortBy(state?.allRecipes, ["createdAt"])
        .reverse()
        .slice(0, 3);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      state.allRecipes = action.payload.data.data.recipe;
    });

    builder.addCase(getRecipes.rejected, (state, action) => {
      state.loading = false;
      state.allRecipes = [];
      state.error = action.error.message;
    });

    builder.addCase(createRecipe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.createdRecipe = action.payload;
    });

    builder.addCase(createRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getRecipe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = action.payload;
    });

    builder.addCase(getRecipe.rejected, (state, action) => {
      state.loading = false;
      state.recipe = null;
      state.error = action.error.message;
    });

    builder.addCase(getMyRecipes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMyRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.myRecipes = action.payload;
    });

    builder.addCase(getMyRecipes.rejected, (state, action) => {
      state.loading = false;
      state.myRecipes = [];
      state.error = action.error.message;
    });
    builder.addCase(updateRecipe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = action.payload;
    });

    builder.addCase(updateRecipe.rejected, (state, action) => {
      state.loading = false;
      state.recipe = {};
      state.error = action.error.message;
    });
    builder.addCase(deleteRecipe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { mostLiked, newest } = recipeSlice.actions;

export default recipeSlice.reducer;
