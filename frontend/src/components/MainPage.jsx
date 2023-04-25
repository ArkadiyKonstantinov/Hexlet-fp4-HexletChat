import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../hooks/index.jsx";
import Channels from "./chat/channels/Channels.jsx";
import Messages from "./chat/messages/Messages.jsx";
import { fetchInitialData } from "../slices/channelsSlice.js";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  useEffect(() => {
    const fetchData = async () => {
      const authHeader = auth.getAuthHeader();
      dispatch(fetchInitialData(authHeader));
    };
    fetchData();
  }, [dispatch, auth]);

  if (loadingStatus === "loading") {
    return <div className="text-center alight-middle display-1 h-100">{t('chat.loading')}</div>;
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
