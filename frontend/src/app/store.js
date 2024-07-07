import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketReducer from "../features/Tickets/ticketSlice";
import noteReducer from "../features/Notes/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    notes: noteReducer,
  },
});
