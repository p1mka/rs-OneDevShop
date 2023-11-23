import { ACTION_TYPE } from "./action-type";

export const updateCart = (products) => ({
  type: ACTION_TYPE.UPDATE_CART,
  payload: products,
});
