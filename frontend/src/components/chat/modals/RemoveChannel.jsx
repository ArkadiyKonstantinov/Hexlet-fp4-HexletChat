import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { socket } from "../../../socket.js";
import { useTranslation } from "react-i18next";

const RemoveChannel = ({ modal, onHide }) => {
  const { id } = modal;
  const { t } = useTranslation();

  const handleRemoveChannel = (e) => {
    e.preventDefault();
    try {
      socket.emit("removeChannel", { id });
      onHide();
      toast.success(t('toast.channelRemoved'));
    } catch (err) {
      toast.success(t('toast.channelRemoveError'));
      console.error(err);
    }
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeConfirm')}</p>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onHide}>
           {t('modal.cancelButton')} 
          </Button>
          <Button variant="danger" type="button" onClick={handleRemoveChannel}>
            {t('modal.removeButton')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
