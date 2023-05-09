import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import MessageForm from './MessageForm.jsx';
import Message from './Message.jsx';
import { channelsSelectors } from '../../../slices/channelsSlice.js';
import { messagesSelectors } from '../../../slices/messagesSlice.js';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(channelsSelectors.getCurrent);
  const messages = useSelector(messagesSelectors.getCurrent);
  const count = messages.length;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel ? currentChannel.name
                : null}
            </b>
          </p>
          <span className="text-muted">{t('chat.messages', { count })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => {
            const { id } = message;
            return (
              <Message key={id} message={message} />
            );
          })}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
