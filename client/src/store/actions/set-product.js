import { ACTION_TYPE } from "./action-type";

export const setProduct = (product) => ({
  type: ACTION_TYPE.SET_PRODUCT,
  payload: product,
});
