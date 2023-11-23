import { ACTION_TYPE } from "../actions";
import { ROLES } from "../../constants";

const initialUserState = {
  login: "Гость",
  roleId: ROLES.GUEST,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return { ...action.payload };
    }
    case ACTION_TYPE.LOGOUT: {
      return initialUserState;
    }

    default:
      return state;
  }
};
