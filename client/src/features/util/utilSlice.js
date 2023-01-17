import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../http";

export const likeRecipe = createAsyncThunk("util/likerecipe", async (id) => {
    await API.post(`/api/v1/recipes/like/${id}`);
});

export const unLikeRecipe = createAsyncThunk(
    "util/unlikerecipe",
    async (id) => {
        await API.post(`/api/v1/recipes/unlike/${id}`);
    }
);

export const uploadPhoto = createAsyncThunk(
    "util/uploadPhoto",
    async (selectedPhoto) => {
        const data = new FormData();
        data.append("photo", selectedPhoto);

        const photo = await API.post(`/api/v1/upload`, data);
        return photo;
    }
);

const initialState = {
    isModalOpen: false,
    loading: false,
    modalId: "",
    photoUploaded: "",
    error: [],
};

export const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.modalId = action.payload;
            console.log("Modal", action);
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.modalId = "";
        },
        clearError: (state, action) => {
            state.error = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(likeRecipe.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(likeRecipe.fulfilled, (state, action) => {
            state.loading = false;
        });

        builder.addCase(likeRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(unLikeRecipe.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(unLikeRecipe.fulfilled, (state, action) => {
            state.loading = false;
        });

        builder.addCase(unLikeRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(uploadPhoto.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.photoUploaded = action.payload;
        });
        builder.addCase(uploadPhoto.rejected, (state, action) => {
            state.loading = false;
            state.photoUploaded = "";
            state.error = action.error.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal, clearError } = utilSlice.actions;

export default utilSlice.reducer;
