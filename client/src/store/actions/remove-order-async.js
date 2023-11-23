import { request } from "../../utils";

export const removeOrderAsync = (orderId) => async (dispatch) => {
  await request(`/orders/${orderId}`, "DELETE");
};
