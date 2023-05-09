import React from 'react';
import cn from 'classnames';
import { useAuth } from '../../../hooks';

const Message = ({ message }) => {
  const { username: currentUser } = useAuth();
  const { text, username } = message;
  const isCurrentUser = (username === currentUser);

  const justify = cn({
    'justify-content-end': isCurrentUser,
    'justify-content-start': !isCurrentUser,
  });
  const messageStyle = cn({
    'text-bg-primary': isCurrentUser,
    messageCurrentUser: isCurrentUser,
    'text-bg-secondary': !isCurrentUser,
    messageUsers: !isCurrentUser,
  });

  const author = (
    <div className="small text-dark">
      <b>{username}</b>
    </div>
  );

  return (
    <div className={`d-flex mb-2 ${justify}`}>
      <div>
        {isCurrentUser ? null : author}
        <div className={`p-3 py-2 text-break ${messageStyle}`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Message;
