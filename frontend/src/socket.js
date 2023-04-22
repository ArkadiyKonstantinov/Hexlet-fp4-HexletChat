import { io } from "socket.io-client";
import store from "./slices/index.js";
import { messagesActions } from "./slices/messagesSlice.js"

export const socket = io();
const dispatch = store.dispatch; 

socket.on("newMessage", (messageWithId) => {
  dispatch(messagesActions.addMessage(messageWithId));
  console.log(messageWithId);
});
