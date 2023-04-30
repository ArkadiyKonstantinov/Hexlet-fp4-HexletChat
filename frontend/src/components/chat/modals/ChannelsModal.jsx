import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

import { modalActions, modalSelectors } from '../../../slices/modalSlice';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(modalSelectors.isOpened);
  const type = useSelector(modalSelectors.getType);
  const hideModal = () => dispatch(modalActions.hideModal());

  const Component = modals[type];
  return (
    <Modal show={isOpened} centered onHide={hideModal}>
      {Component ? <Component onHide={hideModal} /> : null}
    </Modal>
  );
};

export default ChannelsModal;
