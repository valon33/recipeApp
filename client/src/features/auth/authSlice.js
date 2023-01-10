import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("wtf", email, password);
    try {
      return await axios.post(`${baseUrl}/api/v1/users/login`, {
        email,
        password,
      });
    } catch (error) {
      // return error;
      console.log("wtf error", error);
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk("auth/signup", async (newuser) => {
  return await axios.post(`${baseUrl}/api/v1/users/signup`, { ...newuser });
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  window.localStorage.removeItem("token");
  return await axios.get(`${baseUrl}/api/v1/users/logout`);
});

export const currentUser = createAsyncThunk("auth/currentuser", async () => {
  return await axios.get(`${baseUrl}/api/v1/users/currentuser`);
});

export const updateUser = createAsyncThunk("auth/updateuser", async (user) => {
  return await axios.patch(`${baseUrl}/api/v1/users/${user.id}`, { ...user });
});

const initialState = {
  loading: false,
  token: "",
  user: {},
  isLoggedIn: false,
  error: [],
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.data.user;
        state.token = action.payload.data.data.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = "";
        state.token = "";
        state.error = action.error.message;
      });

    builder.addCase(logOut.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
    });

    // builder.addCase(currentUser.pending, (state) => {
    //   state.isLoggedIn = false;
    // });

    // builder.addCase(currentUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    // });

    // builder.addCase(currentUser.rejected, (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   state.error = action.error.message;
    // });

    // builder.addCase(signUp.pending, (state) => {
    //   state.isLoggedIn = false;
    //   state.loading = true;
    //   state.user = null;
    // });
    // builder.addCase(signUp.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isLoggedIn = true;
    //   state.user = action.payload;
    // });
    // builder.addCase(signUp.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isLoggedIn = false;
    //   state.error = action.error.message;
    // });

    // builder.addCase(updateUser.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // });
    // builder.addCase(updateUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default userSlice.reducer;
