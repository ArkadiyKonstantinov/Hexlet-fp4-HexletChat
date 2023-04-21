import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
  },
})

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
