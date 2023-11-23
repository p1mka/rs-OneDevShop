import { ACTION_TYPE } from "../actions";

const initialAppState = {
  isLoading: false,
  isMenuVisible: false,
  modalWindow: {
    isOpen: false,
  },
  isPasswordVisible: false,
  isShowNotification: false,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ACTION_TYPE.SET_IS_MENU_VISIBLE: {
      return { ...state, isMenuVisible: !state.isMenuVisible };
    }
    case ACTION_TYPE.SET_IS_MODAL_OPEN: {
      return { ...state, modalWindow: { isOpen: !state.modalWindow.isOpen } };
    }
    case ACTION_TYPE.SET_IS_PASSWORD_VISIBLE: {
      return { ...state, isPasswordVisible: action.payload };
    }
    case ACTION_TYPE.SET_IS_SHOW_NOTIFICATION: {
      return { ...state, isShowNotification: action.payload };
    }
    default:
      return state;
  }
};
