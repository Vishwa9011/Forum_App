import { SIGN_UP_ERROR, SIGN_UP_LOADING, SIGN_UP_SUCCESS } from "./signin.types";

type AuthState = {
    loading: boolean;
    error: boolean;
    data: {};
};

type AuthAction = {
    type: string;
    payload?: any;
};

export const authInitalState:AuthState = {
  loading: false,
  data: {
    token: "",
    isAuthenticated: false,
  },
  error: false,
};

export const authReducer = (state:AuthState = authInitalState, { type, payload }:AuthAction) => {

  switch (type) {
    case SIGN_UP_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          token: payload,
          isAuthenticated: true
        }
      }
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }

    

    default: return state;
  }

};
