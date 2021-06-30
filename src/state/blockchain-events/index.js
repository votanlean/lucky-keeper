import { createSlice } from '@reduxjs/toolkit';

const blockchainEventSlice = createSlice({
  name: 'blockchainEvents',
  initialState: {
    events: {
      NewData: [],
      Winner: [],
    },
  },
  reducers: {
    fetchEventData: (state, action) => {
      const { events } = action.payload;

      console.log('New fetch data:', events);

      if (events) {
        state.events = events;
      }
    }
  },
});

export default blockchainEventSlice.reducer;

export const blockchainEventActions = blockchainEventSlice.actions;