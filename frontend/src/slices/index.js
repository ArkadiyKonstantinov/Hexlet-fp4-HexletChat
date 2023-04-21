import { configureStore } from '@reduxjs/toolkit';
import channnelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channnelsReducer,
    messages: messagesReducer,
  },
});
