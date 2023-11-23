import { request } from "../../utils";
import { clearCart } from "./clear-cart";
import { setIsLoading } from "./set-is-loading";
import { setOrders } from "./set-orders";

export const addOrderAsync = (orderData) => (dispatch) => {
  request(`/orders`, "POST", orderData)
    .then(({ error, data }) => {
      if (error) {
        throw new Error("Ошибка сервера...");
      }
      dispatch(clearCart());
      dispatch(setOrders(data));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
