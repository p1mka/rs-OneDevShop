import { request } from "../../utils";
import { setProducts } from "./set-products";

export const addProductAsync = (updatedProduct) => async (dispatch) => {
  request(`/products`, "POST", {
    updatedProduct,
  }).then(({ error, data }) => {
    dispatch(setProducts(data));
  });
};
