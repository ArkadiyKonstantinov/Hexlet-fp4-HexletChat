import React, { useState } from "react";
import { useSelector } from "react-redux";
import { channelsSelectors } from "../../../slices/channelsSlice.js";
import { BsPlusSquare } from "react-icons/bs";
import { Col, Button, Nav } from "react-bootstrap";
import Channel from "./Channel.jsx";
import ChannelsModal from "../modals/ChannelsModal.jsx";
import { useTranslation } from "react-i18next";

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const [modal, setModal] = useState({
    type: null,
    channelName: null,
    id: null,
  });
  const hideModal = () => setModal({ type: null, channelName: null });
  const showModal = (type, channelName = null, id = null) =>
    setModal({ type, channelName, id });

  return (
    <>
      <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('chat.title')}</b>
          <Button
            variant="group-vertical"
            className="p-0 text-primary"
            onClick={() => showModal("addChannel")}
          >
            <BsPlusSquare />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav
          id="channels-box"
          variant="pills"
          fill
          as="ul"
          className="felx-column px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) => (
            <Channel key={channel.id} channel={channel} showModal={showModal} />
          ))}
        </Nav>
      </Col>
      <ChannelsModal modal={modal} hideModal={hideModal} />
    </>
  );
};

export default Channels;
