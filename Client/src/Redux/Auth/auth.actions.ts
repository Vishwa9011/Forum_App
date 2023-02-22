import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";
import { LoginCred, UserI } from "../../Constants/constant";


const GoogleAuth = () => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          const userCredential = await signInWithPopup(auth, Provider);
          const user = userCredential.user;

          const userDetail = {
               userID: user.uid,
               username: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
               phoneNumber: user.phoneNumber
          }

          const response = await axios.post("/user/googleauth", userDetail)
          console.log('response: ', response);

     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.AUTH_ERROR, payload: error });
     }
}

const login = (email: string, password: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/login", { email, password })
          dispatch({ type: Types.SIGNIN_SUCCESS, })
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR })
     }
}

const signup = (userData: UserI) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/signup", userData);
          dispatch({ type: Types.SIGNUP_SUCCESS, payload: userData });
     } catch (error) {
          dispatch({ type: Types.AUTH_ERROR })
     }
}



export { GoogleAuth, signup, login };