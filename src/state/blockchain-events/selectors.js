import { useSelector } from "react-redux";

export const useEventData = () => {
  return useSelector(state => state.blockchainEvents);
}
