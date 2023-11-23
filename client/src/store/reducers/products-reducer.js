import { ACTION_TYPE } from "../actions";

const initialState = [];

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
};
