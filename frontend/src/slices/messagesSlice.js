import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
})

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
