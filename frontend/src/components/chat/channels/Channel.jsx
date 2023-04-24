import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { channelsActions } from "../../../slices/channelsSlice";
import { useTranslation } from "react-i18next";

const Channel = ({ channel, showModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = channel;

  const setCurrent = (id) => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  if (removable) {
    return (
      <Nav.Item key={id} as="li" className="w-100">
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
            <span className="visually-hidden">{t('chat.dropdownTitle')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal("removeChannel", name, id)}>
             {t('chat.dropdownRemove')} 
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal("renameChannel", name, id)}>
             {t('chat.dropdownRename')} 
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
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
