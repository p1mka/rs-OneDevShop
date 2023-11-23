import { request } from "../../utils";

export const removeUserAsync = (userId) => async (dispatch) => {
  await request(`/users/${userId}`, "DELETE");
};
