import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';
import modal from './modalSlice.js';

export default configureStore({
  reducer: {
    channels,
    messages,
    modal,
  },
});
