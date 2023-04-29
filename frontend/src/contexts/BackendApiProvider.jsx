import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BackendApiContext } from './index.jsx';
import { messagesActions } from '../slices/messagesSlice.js';
import { channelsActions } from '../slices/channelsSlice.js';

const BackendApiProvider = ({ children, socket }) => {
  const TIMEOUT = 5000;
  const dispatch = useDispatch();

  const values = useMemo(() => {
    const connectBackend = () => {
      socket.connect();

      socket.on('newMessage', (messageWithId) => {
        dispatch(messagesActions.addMessage(messageWithId));
      });
      socket.on('newChannel', (channelWithId) => {
        dispatch(channelsActions.addChannel(channelWithId));
        dispatch(channelsActions.setCurrentChannel(channelWithId.id));
      });
      socket.on('removeChannel', (data) => {
        dispatch(channelsActions.removeChannel(data));
      });
      socket.on('renameChannel', (channel) => {
        dispatch(channelsActions.renameChannel(channel));
      });
    };

    const disconnectBackend = () => {
      socket.removeAllListeners();
      socket.disconnect();
    };

    const newMessage = async (message) => {
      await socket.timeout(TIMEOUT).emitWithAck('newMessage', message);
    };

    const newChannel = async (channelName) => {
      await socket.timeout(TIMEOUT).emitWithAck('newChannel', channelName);
    };

    const removeChannel = async (channelId) => {
      await socket.timeout(TIMEOUT).emitWithAck('removeChannel', channelId);
    };

    const renameChannel = async (channel) => {
      await socket.timeout(TIMEOUT).emitWithAck('renameChannel', channel);
    };

    return {
      connectBackend,
      disconnectBackend,
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    };
  }, [dispatch, socket]);

  return (
    <BackendApiContext.Provider value={values}>
      {children}
    </BackendApiContext.Provider>
  );
};

export default BackendApiProvider;
