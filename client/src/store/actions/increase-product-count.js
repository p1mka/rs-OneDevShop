import { ACTION_TYPE } from "./action-type";

export const increaseProductCount = (productId) => ({
  type: ACTION_TYPE.INCREASE_PRODUCT_COUNT,
  payload: productId,
});
