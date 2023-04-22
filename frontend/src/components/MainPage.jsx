import { routes } from "../routes.js";
import axios from "axios";
import cn from "classnames";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { channelsSelectors, channelsActions } from "../slices/channelsSlice.js";
import { messagesSelectors, messagesActions } from "../slices/messagesSlice.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();
  // const socket = io();
  const [currentChannelId, setCurrentChannelId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      const channels = data.channels.reduce(
        (acc, channel) => ({ ...acc, [channel.id]: channel }),
        {}
      );
      const messages = data.messages.reduce(
        (acc, message) => ({ ...acc, [message.id]: message }),
        {}
      );
      setCurrentChannelId(data.currentChannelId);
      dispatch(channelsActions.setChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) =>
    channelsSelectors.selectById(state, currentChannelId)
  );
  const messages = useSelector(messagesSelectors.selectAll);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button className="btn p-0 text-primary btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul
            id="channels-box"
            className="nav felx-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((channel) => {
              const channelButtonClass = cn(
                "btn",
                "w-100",
                "rounded-0",
                "text-start",
                { "btn-secondary": channel.id === currentChannelId }
              );
              return (
                <li key={channel.id} className="nav-item w-100">
                  <button className={channelButtonClass}>
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># {currentChannel ? currentChannel.name : null}</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5"
            ></div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <Form.Group className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                  />
                  <button
                    type="submit"
                    disabled
                    className="btn btn-group-vertical"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      ></path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
