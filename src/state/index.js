import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import blockchainEventReducer from './blockchain-events';

export default configureStore({
  reducer: {
    blockchainEvents: blockchainEventReducer,
  },
});

export const useAppDispatch = () => useDispatch();