import { ACTION_TYPE } from "./action-type";

export const removeProductFromCart = (productId) => ({
  type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART,
  payload: productId,
});
