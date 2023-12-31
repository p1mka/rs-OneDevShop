import { request } from "../../utils";
import { setIsLoading } from "./set-is-loading";
import { setOrders } from "./set-orders";

export const getUserOrdersAsync = (userId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  await request(`/orders/${userId}`)
    .then(({ error, data }) => {
      if (error) {
        console.log(error);
        return;
      }
      dispatch(setOrders(data));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
