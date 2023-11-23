import { ACTION_TYPE } from "./action-type";

export const setProductRating = (newRating) => ({
  type: ACTION_TYPE.SET_PRODUCT_RATING,
  payload: newRating,
});
