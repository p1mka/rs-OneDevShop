import { request } from "../../utils";
import { setIsLoading } from "./set-is-loading";
import { setOrders } from "./set-orders";

export const cancelOrderAsync = (orderId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  await request(`/orders/${orderId}`, "PATCH", {
    newOrderData: { statusId: "3" },
  })
    .then(({ error, data }) => dispatch(setOrders(data)))
    .finally(() => dispatch(setIsLoading(false)));
};
