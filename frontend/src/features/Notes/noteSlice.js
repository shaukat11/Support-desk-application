import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSucess: false,
  isloading: false,
  message: "",
};

// Fetch all Notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketId, thuckAPI) => {
    try {
      const token = thuckAPI.getState().auth.user.token; // Getting user token stored in auth with the help of thuckAPI.
      return await noteService.getNotes(ticketId, token); // to register user using authservice to keep page clean and meaningfull
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

// create Notes
export const createNotes = createAsyncThunk(
  "notes/create",
  async ({ noteText, ticketId }, thuckAPI) => {
    try {
      const token = thuckAPI.getState().auth.user.token; // Getting user token stored in auth with the help of thuckAPI.
      return await noteService.createNotes(noteText, ticketId, token); // to register user using authservice to keep page clean and meaningfull
    } catch (error) {
      // Message for Backend.

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

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSucess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isError = true;
        state.isloading = false;
        state.message = action.payload;
      })
      .addCase(createNotes.pending, (state) => {
        state.isloading = true;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSucess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.isError = true;
        state.isloading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
