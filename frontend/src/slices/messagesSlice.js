import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelsActions, fetchInitialData } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        messagesAdapter.setAll(state, payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        const restMessages = Object.values(state.entities).filter(
          ({ channelId }) => channelId !== id,
        );
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export const messagesSelectors = {
  getAll: selectors.selectAll,
  getCurrent: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectAll(state)
      .filter(({ channelId }) => channelId === currentChannelId);
  },
};
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
