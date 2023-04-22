import React, { useEffect, useState } from "react";
import { socket } from "../socket.js";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import useAuth from "../hooks/index.jsx";
import fetchData from "../fetchData.js";
import Channels from "./chat/channels/Channels.jsx";
import Messages from "./chat/messages/Messages.jsx";

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const authHeader = auth.getAuthHeader();
      dispatch(fetchData(authHeader));
    };
    fetchUserData();
  }, [dispatch, auth]);

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
