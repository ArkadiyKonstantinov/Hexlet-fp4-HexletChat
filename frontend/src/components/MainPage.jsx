import React, { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channels from './chat/channels/Channels.jsx';
import Messages from './chat/messages/Messages.jsx';

import { useAuth, useBackendApi } from '../hooks/index.jsx';
import {
  channelsSelectors,
  fetchInitialData,
} from '../slices/channelsSlice.js';

const Chat = () => (
  <>
    <Channels />
    <Messages />
  </>
);

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="w-auto m-auto">
      <Spinner variant="primary" animation="grow" role="status">
        <span className="visually-hidden">{t('chat.loading')}</span>
      </Spinner>
    </div>
  );
};

const Wrapper = ({ children }) => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      {children}
    </Row>
  </Container>
);

const MainPage = () => {
  const { getAuthHeader } = useAuth();
  const { connectBackend, disconnectBackend } = useBackendApi();
  const dispatch = useDispatch();
  const loadingStatus = useSelector(channelsSelectors.getLoadintStatus);
  console.log(loadingStatus);

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchInitialData(authHeader));
    connectBackend();
    return () => {
      disconnectBackend();
    };
  }, [dispatch, getAuthHeader, connectBackend, disconnectBackend]);

  switch (loadingStatus) {
    case 'loading':
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    case 'loaded':
      return (
        <Wrapper>
          <Chat />
        </Wrapper>
      );
    default:
      return null;
  }
};

export default MainPage;
