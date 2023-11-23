import { ACTION_TYPE } from "../actions";

const initialCartState = [];

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CART: {
      return [...state, { ...action.payload, productCount: 1 }];
    }
    case ACTION_TYPE.UPDATE_CART: {
      return [...action.payload];
    }
    case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART: {
      return state.filter((product) => product.id !== action.payload);
    }

    case ACTION_TYPE.INCREASE_PRODUCT_COUNT: {
      return state.map((product) => {
        if (product.id === action.payload) {
          return { ...product, productCount: product.productCount + 1 };
        }
        return product;
      });
    }

    case ACTION_TYPE.DECREASE_PRODUCT_COUNT: {
      return state.map((product) => {
        if (product.id === action.payload && product.productCount > 1) {
          return { ...product, productCount: product.productCount - 1 };
        }
        return product;
      });
    }
    case ACTION_TYPE.CLEAR_CART: {
      return initialCartState;
    }

    case ACTION_TYPE.LOGOUT: {
      return initialCartState;
    }

    default:
      return state;
  }
};
