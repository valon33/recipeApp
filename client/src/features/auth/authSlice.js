import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../http";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("wtf", email, password);
    try {
      return await API.post(`/api/v1/users/login`, {
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
  return await API.post(`/api/v1/users/signup`, { ...newuser });
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  window.localStorage.removeItem("token");
  return await API.get(`/api/v1/users/logout`);
});

export const currentUser = createAsyncThunk("auth/currentuser", async () => {
  return await API.get(`/api/v1/users/currentuser`);
});

export const updateUser = createAsyncThunk("auth/updateuser", async (user) => {
  console.log("user from api", user);
  console.log("id from api", user.id);
  return await API.patch(`/api/v1/users/${user.id}`, { ...user });
});

const initialState = {
  loading: false,
  token: "",
  user: null,
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
        state.user = null;
        state.token = null;
        state.error = action.error.message;
      });

    builder.addCase(logOut.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    });

    builder
      .addCase(currentUser.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.error.message;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.user = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("from redux", action.payload);
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
