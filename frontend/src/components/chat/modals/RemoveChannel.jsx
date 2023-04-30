import React from 'react';
import { useSelector } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useBackendApi } from '../../../hooks/index.jsx';
import { modalSelectors } from '../../../slices/modalSlice.js';

const RemoveChannel = ({ onHide }) => {
  const { removeChannel } = useBackendApi();
  const { id } = useSelector(modalSelectors.getData);
  const { t } = useTranslation();

  const handleRemoveChannel = async (e) => {
    e.preventDefault();
    try {
      await removeChannel({ id });
      onHide();
      toast.success(t('toast.channelRemoved'));
    } catch (err) {
      toast.error(t('toast.channelRemoveError'));
      console.error(err);
    }
  };
  return (
    <>
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
    </>
  );
};

export default RemoveChannel;
