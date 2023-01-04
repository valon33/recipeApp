import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("auth/login", async (email, password) => {
    return await axios
        .post(`/api/v1/users/login`, {
            email,
            password,
        })
});

const logOut = createAsyncThunk("auth/logout", async () => {
    await axios.get(`/api/v1/users/logout`);
});

const initialState = {
    loading: false,
    isLoggedIn: false,
    error: [],
    user: null,
};

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.isLoggedIn = false;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.error.message;
        });

        builder.addCase(logOut.pending, (state) => {
            state.loading = true;
            state.isLoggedIn = true;
        });

        builder.addCase(logOut.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isLoggedIn = false;
        });

        builder.addCase(logOut.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.error.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;

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

// const currentUser = async () => {
//     try {
//         const user = await API.get(`/api/v1/users/currentuser`);
//         if (user) dispatch({ type: "CURRENT_USER", payload: user.data.user });
//     } catch (error) {
//         dispatch({ type: "ERROR", payload: error.response.data.message });
//     }
// };
