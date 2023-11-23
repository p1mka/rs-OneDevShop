import { request } from "../../utils";
import { setProducts } from "./set-products";

export const removeProductAsync = (productId) => async (dispatch) => {
  await request(`/products/${productId}`, "DELETE").then(({ error, data }) => {
    dispatch(setProducts(data));
  });
};
