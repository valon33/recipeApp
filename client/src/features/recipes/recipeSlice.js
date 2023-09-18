import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "../../http";
import _ from "lodash";

export const getRecipes = createAsyncThunk("recipe/getrecipes", async () => {
  return await API.get(`/api/v1/recipes`);
});

export const createRecipe = createAsyncThunk(
  "recipe/createrecipe",
  async ({
    recipe,
    recipeTitle,
    category,
    prepTime,
    shortDescription,
    numberPeople,
    author,
    photo,
  }) => {
    return await API.post(`/api/v1/recipes`, {
      recipe,
      recipeTitle,
      category,
      prepTime,
      shortDescription,
      numberPeople,
      author,
      photo,
    });
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

export const likeRecipe = createAsyncThunk("util/likerecipe", async (id) => {
  return await API.post(`/api/v1/recipes/like/${id}`);
});

export const unLikeRecipe = createAsyncThunk(
  "util/unlikerecipe",
  async (id) => {
    return await API.post(`/api/v1/recipes/unlike/${id}`);
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
  sortedRecipes: [],
  likedrecipe: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    mostLiked: (state) => {
      const { allRecipes } = state;
      const mostLiked = _.sortBy(allRecipes, ["likes"]).reverse();
      state.mostLikedRecipes = mostLiked;
    },
    newest: (state) => {
      const { allRecipes } = state;
      const newestRecipes = _.sortBy(allRecipes, ["createdAt"])
        .reverse()
        .slice(0, 3);
      state.newestRecipes = newestRecipes;
    },
    sorted: (state, action) => {
      state.sortedRecipes = state.allRecipes.filter(
        (recepis) => recepis.category === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.allRecipes = action.payload.data.data.recipe;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.allRecipes = [];
        state.error = action.error.message;
      });

    builder
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Created Recipe", action.payload.data.data);
        state.createdRecipe = action.payload;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.loading = false;
        state.recipe = null;
        state.error = action.error.message;
      });

    builder
      .addCase(getMyRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecipes = action.payload.data.data.recipes;
      })
      .addCase(getMyRecipes.rejected, (state, action) => {
        state.loading = false;
        state.myRecipes = [];
        state.error = action.error.message;
      });

    builder
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.recipe = {};
        state.error = action.error.message;
      });

    builder
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.myRecipes = state.myRecipes.filter(
          (rec) => rec._id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(likeRecipe.fulfilled, (state, action) => {
        const { allRecipes } = current(state);
        const id = action.payload.data.data.likedRecipe._id;
        const filteredRecipes = allRecipes.filter((rec) => rec._id !== id);
        const newObj = [
          ...filteredRecipes,
          action.payload.data.data.likedRecipe,
        ];

        console.log("newObj", newObj);
        state.allRecipes = newObj;
      })
      .addCase(likeRecipe.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(unLikeRecipe.fulfilled, (state, action) => {
        console.log(
          "unlikedRecipe Recipe",
          action.payload.data.data.unlikedRecipe,
          action.payload
        );

        state.loading = false;
        const { allRecipes } = current(state);
        const id = action.payload.data.data.unlikedRecipe._id;
        const filteredRecipes = allRecipes.filter((rec) => rec._id !== id);
        const newObj = [
          ...filteredRecipes,
          action.payload.data.data.unlikedRecipe,
        ];
        state.allRecipes = newObj;
      })
      .addCase(unLikeRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { mostLiked, newest, sorted } = recipeSlice.actions;

export default recipeSlice.reducer;
