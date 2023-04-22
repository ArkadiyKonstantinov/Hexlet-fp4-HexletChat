import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { channelsSelectors, channelsActions } from "../../../slices/channelsSlice.js";
import { messagesSelectors, messagesActions } from "../../../slices/messagesSlice.js";
import { Col, Form, Button } from "react-bootstrap";
import { BsArrowRightSquare } from "react-icons/bs";

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
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
              />
              <Button variant="group-vertical">
                <BsArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
