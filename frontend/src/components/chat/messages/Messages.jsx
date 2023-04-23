import React from "react";
import { useSelector } from "react-redux";
import { channelsSelectors } from "../../../slices/channelsSlice.js";
import { messagesSelectors } from "../../../slices/messagesSlice.js";
import { Col } from "react-bootstrap";
import MessageForm from "./MessageForm.jsx";

const Messages = () => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const currentChannel = useSelector((state) =>
    channelsSelectors.selectById(state, currentChannelId)
  );
  const messages = useSelector(messagesSelectors.selectAll);
  console.log("All messages");
  console.log(messages);
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId
  );

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel ? currentChannel.name : null}</b>
          </p>
          <span className="text-muted">
            {currentChannelMessages.length} сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => {
            const { text, id, username } = message;
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>: {text}
              </div>
            );
          })}
        </div>
        <MessageForm currentChannelId={currentChannelId} />
      </div>
    </Col>
  );
};

export default Messages;
