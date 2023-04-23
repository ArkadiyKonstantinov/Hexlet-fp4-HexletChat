import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import fetchData from "../fetchData";
import { channelsActions } from "./channelsSlice.js";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        const restMessages = Object.values(state.entities).filter(({ channelId }) => channelId !== id);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages
);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
