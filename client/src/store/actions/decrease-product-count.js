import { ACTION_TYPE } from "./action-type";

export const decreaseProductCount = (productId) => ({
  type: ACTION_TYPE.DECREASE_PRODUCT_COUNT,
  payload: productId,
});
