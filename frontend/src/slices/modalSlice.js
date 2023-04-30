/* eslint-disable no-param-reassign */
import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type;
      state.data = payload.data;
    },
    hideModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.data = null;
    },
  },
});

const modalSelectors = {
  getState: (state) => state.modal,
  isOpened: (state) => state.modal.isOpened,
  getType: (state) => state.modal.type,
  getData: (state) => state.modal.data,
};
const modalActions = modalSlice.actions;
export { modalActions, modalSelectors };
export default modalSlice.reducer;
