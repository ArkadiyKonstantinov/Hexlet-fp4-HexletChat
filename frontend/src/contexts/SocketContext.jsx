import React from "react";
import { SocketContext } from "./index.jsx";
import { io } from "socket.io-client";
import store from "../slices/index.js";
import { messagesActions } from "../slices/messagesSlice.js";
import { channelsActions } from "../slices/channelsSlice.js";

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = store.dispatch;

  socket.on("newMessage", (messageWithId) => {
    dispatch(messagesActions.addMessage(messageWithId));
  });

  socket.on("newChannel", (channelWithId) => {
    dispatch(channelsActions.addChannel(channelWithId));
    dispatch(channelsActions.setCurrentChannel(channelWithId.id));
  });

  socket.on("removeChannel", (data) => {
    dispatch(channelsActions.removeChannel(data));
  });

  socket.on("renameChannel", (channel) => {
    dispatch(channelsActions.renameChannel(channel));
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
