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

export const userSlice = createSlice({
    name: "user",
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
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;

// const login = async (email, password) => {
//     try {
//         const user = await API.post(`/api/v1/users/login`, {
//             email,
//             password,
//         });
//         console.log("From the Context current User token", user.data.data);
//         setToken(user.data.data.token);
//         if (user) dispatch({ type: "LOGIN", payload: user.data.data.user });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const signUp = async ({
//     name,
//     lastName,
//     email,
//     password,
//     passwordConfirm,
//     birthDay,
// }) => {
//     const date = new Date(birthDay);
//     try {
//         const newUser = await API.post(`/api/v1/users/signup`, {
//             name,
//             lastName,
//             email,
//             password,
//             passwordConfirm,
//             date,
//         });
//         if (newUser)
//             dispatch({ type: "SIGNUP", payload: newUser.data.data.user });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const updateUser = async (
//     id,
//     name,
//     email,
//     lastName,
//     birthday,
//     password,
//     passwordConfirm,
//     photo
// ) => {
//     try {
//         let updateUser;
//         if (!password && !passwordConfirm && !photo) {
//             updateUser = await API.patch(`/api/v1/users/${id}`, {
//                 name,
//                 email,
//                 lastName,
//                 birthday,
//             });
//         } else if (!password && !passwordConfirm && photo) {
//             updateUser = await API.patch(`/api/v1/users/${id}`, {
//                 name,
//                 email,
//                 lastName,
//                 birthday,
//                 photo,
//             });
//         } else if (password && !photo) {
//             updateUser = await API.patch(`/api/v1/users/${id}`, {
//                 name,
//                 email,
//                 lastName,
//                 birthday,
//                 password,
//                 passwordConfirm,
//             });
//         } else if (password && passwordConfirm && photo) {
//             updateUser = await API.patch(`/api/v1/users/${id}`, {
//                 name,
//                 email,
//                 lastName,
//                 birthday,
//                 password,
//                 passwordConfirm,
//                 photo,
//             });
//         }

//         if (updateUser) {
//             dispatch({
//                 type: "UPDATE_USER",
//                 payload: updateUser.data,
//             });
//         }
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };

// const logOut = async () => {
//     await API.get(`/api/v1/users/logout`);
//     removeToken("token");
//     dispatch({ type: "LOGOUT" });
// };

// const currentUser = async () => {
//     try {
//         const user = await API.get(`/api/v1/users/currentuser`);
//         if (user) dispatch({ type: "CURRENT_USER", payload: user.data.user });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };
