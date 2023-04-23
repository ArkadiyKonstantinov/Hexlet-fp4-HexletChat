import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { socket } from "../../../socket.js";

const RemoveChannel = ({ modal, onHide }) => {
  const { id } = modal;
  const handleRemoveChannel = (e) => {
    e.preventDefault();
    try {
      socket.emit("removeChannel", { id });
      onHide();
      toast.success("Канал удалён");
    } catch (err) {
      toast.success("Удалить не удалось");
      console.error(err);
    }
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="danger" type="button" onClick={handleRemoveChannel}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
