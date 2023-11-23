import { ACTION_TYPE } from "./action-type";

export const setIsShowNotification = (value) => ({
  type: ACTION_TYPE.SET_IS_SHOW_NOTIFICATION,
  payload: value,
});
