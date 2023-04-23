import React, { useEffect, useState } from "react";
import { socket } from "../socket.js";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import useAuth from "../hooks/index.jsx";
import { fetchInitialData } from "../slices/channelsSlice.js";
import Channels from "./chat/channels/Channels.jsx";
import Messages from "./chat/messages/Messages.jsx";

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  console.log(loadingStatus)

  useEffect(() => {
    const fetchData = async () => {
      const authHeader = auth.getAuthHeader();
      dispatch(fetchInitialData(authHeader));
    };
    fetchData();
  }, [dispatch, auth]);

  if (loadingStatus === "loading") {
    return <div className="text-center alight-middle display-1 h-100">Loading...</div>;
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
