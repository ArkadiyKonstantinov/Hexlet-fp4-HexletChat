import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import fetchData from "../fetchData";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      messagesAdapter.setAll(state, payload.messages);
    });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages
);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
