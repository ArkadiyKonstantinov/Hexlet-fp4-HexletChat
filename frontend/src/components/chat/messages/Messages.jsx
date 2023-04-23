import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  channelsSelectors,
  channelsActions,
} from "../../../slices/channelsSlice.js";
import {
  messagesSelectors,
  messagesActions,
} from "../../../slices/messagesSlice.js";
import { Col, Form, Button } from "react-bootstrap";
import MessageForm from "./MessageForm.jsx";

const Messages = () => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const currentChannel = useSelector((state) =>
    channelsSelectors.selectById(state, currentChannelId)
  );

  return (
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
        <MessageForm currentChannelId={currentChannelId} />
      </div>
    </Col>
  );
};

export default Messages;
