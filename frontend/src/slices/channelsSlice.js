import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import fetchData from "../fetchData";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  loadingStatus: "idle",
  error: null,
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.currentChannelId = payload.currentChannelId;
        channelsAdapter.setAll(state, payload.channels);
        state.loadingStatus = "idle";
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error;
      });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
