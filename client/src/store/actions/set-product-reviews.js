import { ACTION_TYPE } from "./action-type";

export const setProductReviews = (newReview) => ({
  type: ACTION_TYPE.SET_PRODUCT_REVIEWS,
  payload: newReview,
});
