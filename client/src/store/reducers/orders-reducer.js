import { ACTION_TYPE } from "../actions";

const initialOrdersState = [];

export const ordersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ORDERS: {
      return [...action.payload];
    }
    case ACTION_TYPE.LOGOUT: {
      return initialOrdersState;
    }
    default:
      return state;
  }
};
