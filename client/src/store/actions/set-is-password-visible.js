import { ACTION_TYPE } from "./action-type";

export const setIsPasswordVisible = (isPasswordVisible) => ({
  type: ACTION_TYPE.SET_IS_PASSWORD_VISIBLE,
  payload: isPasswordVisible,
});
