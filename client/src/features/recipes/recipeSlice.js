import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getRecipes = createAsyncThunk("recipe/getrecipes", async () => {
    return await axios.get("/api/v1/recipes");
});

const createRecipe = createAsyncThunk("recipe/createrecipe", async (recipe) => {
    return await axios.post("/api/v1/recipes", { ...recipe });
});

const getRecipe = createAsyncThunk("recipe/getrecipe", async (id) => {
    return await axios.get(`/api/v1/recipes/${id}`);
});

const getMyRecipes = createAsyncThunk("recipe/getmyrecipes", async () => {
    return await axios.get(`/api/v1/recipes/myrecipes`);
});

const updateRecipe = createAsyncThunk("recipe/updaterecipe", async (recipe) => {
    return await axios.patch(`/api/v1/recipes/${recipe.id}`, { ...recipe });
});

const deleteRecipe = createAsyncThunk("recipe/deleterecipe", async (id) => {
    return await axios.delete(`/api/v1/recipes/${id}`);
});

const initialState = {
    loading: false,
    allRecipes: [],
    myRecipes: [],
    recipe: {},
    createdRecipe: {},
    error: [],
};

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getRecipes.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.allRecipes = action.payload;
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

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = recipeSlice.actions;

export default recipeSlice.reducer;
