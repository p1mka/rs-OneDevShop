import { ACTION_TYPE } from "./action-type";

export const setCart = (productId) => {
  return {
    type: ACTION_TYPE.SET_CART,
    payload: productId,
  };
};
