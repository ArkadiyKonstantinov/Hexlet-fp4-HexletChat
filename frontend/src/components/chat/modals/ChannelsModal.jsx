import React from 'react';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ChannelsModal = ({ modal, hideModal }) => {
  if (!modal.type) {
    return null;
  }

  const Component = modals[modal.type];
  return <Component modal={modal} onHide={hideModal} />;
};

export default ChannelsModal;
