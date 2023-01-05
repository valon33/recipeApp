import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("auth/login", async (email, password) => {
  return await axios.post(`/api/v1/users/login`, {
    email,
    password,
  });
});

const signUp = createAsyncThunk("auth/signup", async (newuser) => {
  return await axios.post(`/api/v1/users/signup`, { ...newuser });
});

const logOut = createAsyncThunk("auth/logout", async () => {
  await axios.get(`/api/v1/users/logout`);
});

const currentUser = createAsyncThunk("auth/currentuser", async () => {
  await axios.get(`/api/v1/users/currentuser`);
});

const updateUser = createAsyncThunk("auth/updateuser", async (user) => {
  return await axios.patch(`/api/v1/users/${user.id}`, { ...user });
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

    builder.addCase(currentUser.pending, (state) => {
      state.isLoggedIn = false;
    });

    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.error.message;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.user = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.error.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
