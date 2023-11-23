import { ACTION_TYPE } from "./action-type";

export const removeReview = (reviewId) => ({
  type: ACTION_TYPE.REMOVE_REVIEW,
  payload: reviewId,
});
