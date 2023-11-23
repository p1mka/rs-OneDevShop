import { ACTION_TYPE } from "./action-type";

export const setOrders = (orders) => ({
  type: ACTION_TYPE.SET_ORDERS,
  payload: orders,
});
