import React from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "./index.jsx";
import { messagesActions } from "../slices/messagesSlice.js";
import { channelsActions } from "../slices/channelsSlice.js";

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch(); 

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
