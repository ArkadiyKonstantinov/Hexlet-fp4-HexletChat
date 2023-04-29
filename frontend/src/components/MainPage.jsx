import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channels from './chat/channels/Channels.jsx';
import Messages from './chat/messages/Messages.jsx';

import { useAuth, useBackendApi } from '../hooks/index.jsx';
import { fetchInitialData } from '../slices/channelsSlice.js';

const MainPage = () => {
  const { getAuthHeader } = useAuth();
  const { t } = useTranslation();
  const { connectBackend, disconnectBackend } = useBackendApi();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchInitialData(authHeader));
    connectBackend();
    return () => {
      disconnectBackend();
    };
  }, [dispatch, getAuthHeader, connectBackend, disconnectBackend]);

  if (loadingStatus === 'loading') {
    return (
      <div className="text-center alight-middle display-1 h-100">
        {t('chat.loading')}
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
