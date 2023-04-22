import React from "react";
import { useSelector } from "react-redux";
import {
  channelsSelectors,
  channelsActions,
} from "../../../slices/channelsSlice.js";
import { BsPlusSquare } from "react-icons/bs";
import { Col, Button } from "react-bootstrap";
import Channel from "./Channel.jsx";

const Channels = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="qroup-vertical" className="p-0 text-primary">
          <BsPlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav felx-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
