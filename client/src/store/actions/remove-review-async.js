import { request } from "../../utils";
import { removeReview } from "./remove-review";
import { setProductRating } from "./set-product-rating";

export const removeReviewAsync = (productId, reviewId) => async (dispatch) => {
  dispatch(removeReview(reviewId));
  await request(`/products/${productId}/reviews/${reviewId}`, "DELETE").then(
    ({ error, data }) => {
      dispatch(setProductRating(data));
    }
  );
};
