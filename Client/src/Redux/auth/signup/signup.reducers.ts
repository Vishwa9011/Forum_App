import { UserI } from "../../../Constants/Constants";
import { SIGN_UP_ERROR, SIGN_UP_LOADING, SIGN_UP_SUCCESS } from "./signup.types";

type AuthState = {
    loading: boolean;
    error: boolean;
    message: string ;
};

type AuthAction = {
    type: string;
    payload?: any;
};

export const authInitalState:AuthState = {
  loading: false,
  message :"",
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
        message:"Registration Successfull"
      }
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message:"Something went wrong"
      }
    }
    default: return state;
  }

};
