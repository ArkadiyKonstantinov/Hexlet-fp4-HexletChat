/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import routes from '../routes.js';

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  loadingStatus: 'notLoaded',
  error: null,
  currentChannelId: defaultChannelId,
});

export const fetchInitialData = createAsyncThunk(
  'channels/fetchInitialData',
  async (authHeader) => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: authHeader,
    });
    return data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      // channelsAdapter.updateOne(state, { id, changes: name });
      state.entities[id].name = name;
    },
    removeChannel: (state, { payload }) => {
      console.dir(payload);
      const { id } = payload;
      channelsAdapter.removeOne(state, id);
      state.currentChannelId = defaultChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        state.currentChannelId = payload.currentChannelId;
        channelsAdapter.setAll(state, payload.channels);
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

const selctors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const channelsSelectors = {
  selectAll: selctors.selectAll,
  getLoadintStatus: (state) => state.channels.loadingStatus,
  getCurrent: (state) => {
    const { currentChannelId } = state.channels;
    return selctors.selectById(state, currentChannelId);
  },
  getChannelNames: (state) => selctors.selectAll(state)
    .map((channel) => channel.name),
};
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
