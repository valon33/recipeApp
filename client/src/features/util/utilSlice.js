import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    loading: false,
    isLogedIn: false,
    modalId: "",
    modalRecipe: {},
    error: [],
    allRecipes: [],
    myRecipes: [],
};

export const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
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

// const likeRecipe = async (id) => {
//   try {
//       await API.post(`/api/v1/recipes/like/${id}`).then((recipe) => {
//           dispatch({
//               type: "LIKE_RECIPE",
//               payload: recipe.data.data.recipe.likes,
//           });
//       });
//   } catch (error) {
//       dispatch({ type: "ERROR", payload: error.response.data.message });
//   }
// };

// const unlikeRecipe = async (id) => {
//   try {
//       await API.post(`/api/v1/recipes/unlike/${id}`).then((recipe) =>
//           dispatch({
//               type: "UNLIKE_RECIPE",
//               payload: recipe.data.data.recipe.likes,
//           })
//       );
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