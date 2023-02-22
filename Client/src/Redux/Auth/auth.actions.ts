import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";
import { UserI } from "../../Constants/constant";
import {ToastType} from "../../Custom-Hooks/Toast"


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

const signup = (userData: UserI,navigate:Function, Toast:Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/register", userData);
          dispatch({type:Types.SIGNUP_SUCCESS,payload:res.data.credentials});
          localStorage.setItem("user",JSON.stringify(res.data.credentials));
          Toast("Registeration Succesfull",ToastType.success);
          navigate("/verifyemail");
     } catch (error) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast("Something went wrong",ToastType.error);
     }
}


export const verifyEmail = (email: string, password: string,Toast:Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/sentverificationemail", { email, password })
          dispatch({ type: Types.VERIFY_EMAIL_SUCCESS,payload: res.data.EncryptedCredential });
          Toast("Verification email sent, Please Check your mail",ToastType.success)
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error",ToastType.error)
     }
}



export { GoogleAuth, signup, login };