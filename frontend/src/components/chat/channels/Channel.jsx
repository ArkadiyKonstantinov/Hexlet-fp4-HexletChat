import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { channelsActions } from "../../../slices/channelsSlice";

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();

  const setCurrent = (id) => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  if (removable) {
    return (
      <li key={id} className="nav-item w-100">
        <Dropdown className="d-flex btn-group">
          <Button
            variant={id === currentChannelId ? "secondary" : "light"}
            className="btn w-100 rounded-0 text-start"
            onClick={() => setCurrent(id)}
          >
            {name}
          </Button>
          <Dropdown.Toggle
            variant={id === currentChannelId ? "secondary" : "light"}
            className="flex-grow-0 dropown-toggle-split"
          >
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }

  return (
    <li key={id} className="nav-item w-100">
      <Button
        variant={id === currentChannelId ? "secondary" : "light"}
        className="btn w-100 rounded-0 text-start"
        onClick={() => setCurrent(id)}
      >
        {name}
      </Button>
    </li>
  );
};

export default Channel;
