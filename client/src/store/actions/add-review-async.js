import { request } from "../../utils";
import { setProductRating } from "./set-product-rating";
import { setProductReviews } from "./set-product-reviews";

export const addReviewAsync =
  (productId, reviewText, reviewRating) => async (dispatch) => {
    await request(`/products/${productId}/reviews`, "POST", {
      reviewText,
      reviewRating,
    }).then(({ error, data }) => {
      dispatch(setProductReviews(data.newReview));
      dispatch(setProductRating(data.newRating));
    });
  };
