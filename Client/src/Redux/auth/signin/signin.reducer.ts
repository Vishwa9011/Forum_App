import { SIGN_IN_ERROR, SIGN_IN_LOADING, SIGN_IN_SUCCESS, RESET_AUTH } from "./signin.types";

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
    case SIGN_IN_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case SIGN_IN_SUCCESS: {
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
    case SIGN_IN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }

    case RESET_AUTH: {
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          isAuthenticated: false,
          token: "",

        }
      }
    }

    default: return state;
  }

};
