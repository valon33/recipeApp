import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../http";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await API.post(`/api/v1/users/login`, {
        email,
        password,
      });
    } catch (error) {
      // return error;
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signUp = createAsyncThunk("auth/signup", async (newuser) => {
    try {
        
    } catch (error) {

    }
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
export const changeUserPassword = createAsyncThunk(
  "auth/changepassword",
  async (user) => {
    console.log("changePassword", user);
    return await API.patch(`/api/v1/users/changepassword`, {
      oldPassword: user.oldPassword,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    });
  }
);

const initialState = {
  loading: true,
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
        console.log("error action", action);
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
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("curr", action.payload.data.user);
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.error.message;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.isLoggedIn = true;
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
        state.user = action.payload.data.data.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        console.log("from redux change password", action.payload);
        state.user = action.payload.data.data.user;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
