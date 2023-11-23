import { ACTION_TYPE } from "../actions";

const initialProductState = {
  id: "",
  img: "",
  title: "",
  description: "",
  price: 0,
  rating: 0,
  amount: 0,
  reviews: [],
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT: {
      return { ...action.payload };
    }
    case ACTION_TYPE.SET_PRODUCT_REVIEWS: {
      return { ...state, reviews: [...state.reviews, action.payload] };
    }
    case ACTION_TYPE.SET_PRODUCT_RATING: {
      return { ...state, rating: action.payload };
    }
    case ACTION_TYPE.REMOVE_REVIEW: {
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
