import { request } from "../../utils";
import { setUser } from "./set-user";

export const updateUserAsync = (userId, newUserData) => async (dispatch) => {
  await request(`/users/${userId}`, "PATCH", {
    newUserData,
  }).then(({ error, data }) => {
    dispatch(setUser(data));
    sessionStorage.setItem("user", JSON.stringify(data));
  });
};
