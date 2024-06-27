import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  //Creating global state for Tickets coming
  tickets: [],
  ticket: {},
  isError: false,
  isSucess: false,
  isloading: false,
  message: "",
};

// creating AsyncThunk to hook the redux and get the values
// it will take a name for the function and inside CAT it will take a string and a async function
// Creating new Ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thuckAPI) => {
    try {
      const token = thuckAPI.getState().auth.user.token; // Getting user token stored in auth with the help of thuckAPI
      return await ticketService.createTicket(ticketData, token); // to register user using authservice to keep page clean and meaningfull
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

// Fetch all Ticket
export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thuckAPI) => {
    try {
      const token = thuckAPI.getState().auth.user.token; // Getting user token stored in auth with the help of thuckAPI.
      return await ticketService.getTickets(token); // to register user using authservice to keep page clean and meaningfull
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

// to create slice which will help us to perfrom task
export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => state.initialState,
  },
  extraReducers: (builder) => {
    // the rejected message and the state of different stage will response base on this code
    builder
      .addCase(createTicket.pending, (state) => {
        state.isloading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isloading = false;
        state.isSucess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSucess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isError = true;
        state.isloading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
