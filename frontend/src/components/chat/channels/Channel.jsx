import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

const Channel = ({ channel }) => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const channelButtonClass = cn("btn", "w-100", "rounded-0", "text-start", {
    "btn-secondary": channel.id === currentChannelId,
  });
  return (
    <li key={channel.id} className="nav-item w-100">
      <button className={channelButtonClass}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
