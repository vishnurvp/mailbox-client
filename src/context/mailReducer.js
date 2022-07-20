import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  inbox: {},
  sentmail: {},
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    setInbox(state, action) {
      state.inbox = action.payload;
    },
    setSentMail(state, action) {
      state.sentmail = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;