import { request } from "../../utils";
import { setProducts } from "./set-products";

export const updateProductAsync = (updatedProduct) => async (dispatch) => {
  await request(`/products/${updatedProduct.id}`, "PATCH", {
    updatedProduct,
  }).then(({ error, data }) => {
    dispatch(setProducts(data));
  });
};
