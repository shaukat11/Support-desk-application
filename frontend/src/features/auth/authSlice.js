import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Getting user from localStorage and
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// creating AsyncThunk to hook the redux and get the values
// it will take a name for the function and inside CAT it will take a string and a async function
// Creating new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thuckAPI) => {
    try {
      return await authService.register(user); // to register user using authservice to keep page clean and meaningfull
    } catch (error) {
      // Message for Backend
      const message =
        // Checking the place where we can find message in the backend
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      //rejected case need to be handled which will be delead by the extrareducers and reducers
      return thuckAPI.rejectWithValue(message);
    }
  }
);

// Login the user
export const logIn = createAsyncThunk("auth/login", async (user, thuckAPI) => {
  try {
    return await authService.logIn(user); // this function is created in authService for keeping the code better and clean
  } catch (error) {
    // Message for Backend
    const message =
      // Checking the place where we can find message in the backend
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    //rejected case need to be handled which will be delead by the extrareducers and reducers
    return thuckAPI.rejectWithValue(message);
  }
});

//Logout the user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // to reset the state if there is nothing recieved from the game
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // the rejected message and the state of different stage will response base on this code
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
