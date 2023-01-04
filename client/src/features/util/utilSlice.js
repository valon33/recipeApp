import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const likeRecipe = createAsyncThunk("util/likerecipe", async (id) => {
    await axios.post(`/api/v1/recipes/like/${id}`);
});

const unLikeRecipe = createAsyncThunk("util/unlikerecipe", async (id) => {
    await axios.post(`/api/v1/recipes/unlike/${id}`);
});

const initialState = {
    isModalOpen: false,
    loading: false,
    modalId: "",
    modalRecipe: {},
    error: [],
};

export const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
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
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = utilSlice.actions;

export default utilSlice.reducer;

// const uploadPhoto = async (selectedPhoto) => {
//   try {
//       const data = new FormData();
//       data.append("photo", selectedPhoto);

//       const photo = await API.post(`/api/v1/upload`, data);

//       if (photo) {
//           dispatch({ type: "UPLOAD_PHOTO" });
//       }
//   } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message });
//   }
// };

// const openModal = (id) => {
//   dispatch({ type: "OPEN_MODAL", payload: id });
// };

// const closeModal = () => {
//   dispatch({ type: "CLOSE_MODAL" });
// };
// const clearError = () => {
//   dispatch({ type: "CLEAR_ERROR" });
// };
