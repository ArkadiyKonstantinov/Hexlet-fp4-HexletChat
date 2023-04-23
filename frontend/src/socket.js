import { io } from "socket.io-client";
import store from "./slices/index.js";
import { messagesActions } from "./slices/messagesSlice.js";
import { channelsActions } from "./slices/channelsSlice.js";

export const socket = io();
const dispatch = store.dispatch;

socket.on("newMessage", (messageWithId) => {
  dispatch(messagesActions.addMessage(messageWithId));
  console.log(messageWithId);
});

socket.on("newChannel", (channelWithId) => {
  dispatch(channelsActions.addChannel(channelWithId));
  console.log(channelWithId);
});
