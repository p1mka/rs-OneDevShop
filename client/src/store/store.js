import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { localStorageMiddleware } from "./middlewares/local-storage";
import {
  appReducer,
  productReducer,
  productsReducer,
  cartReducer,
} from "./reducers";
import { userReducer } from "./reducers/user-reducer";
import { ordersReducer } from "./reducers/orders-reducer";

const reducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  orders: ordersReducer,
  product: productReducer,
  products: productsReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, localStorageMiddleware))
);
