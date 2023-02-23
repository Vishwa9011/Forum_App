import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";
import { UserI } from "../../Constants/constant";
import { ToastType } from "../../Custom-Hooks/Toast"


export const GoogleAuth = (navigate: Function, Toast: Function) => async (dispatch: Dispatch) => {
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

          const res = await axios.post("/user/googleauth", userDetail)

          sessionStorage.setItem("user", JSON.stringify(res.data));

          Toast("Login Success", ToastType.success);

          dispatch({ type: Types.SIGNIN_SUCCESS, payload: res.data.credentials })

          navigate("/")
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.AUTH_ERROR, payload: error });
     }
}

export const login = (email: string, password: string, navigate: Function, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/login", { email, password });
          sessionStorage.setItem("user", JSON.stringify(res.data.credentials));
          Toast("Login Success", ToastType.success);
          dispatch({ type: Types.SIGNIN_SUCCESS, payload: res.data.credentials })
          navigate("/")
     } catch (err) {
          Toast("There is some problem", ToastType.error);
          dispatch({ type: Types.AUTH_ERROR })
     }
}

export const signup = (userData: UserI, navigate: Function, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     if (userData.email == null) return Toast("something went wrong", ToastType.info)
     try {
          let res = await axios.post("/user/register", userData);
          console.log('res: ', res);

          const credential = res.data.credentials

          dispatch({ type: Types.SIGNUP_SUCCESS, payload: credential });

          sessionStorage.setItem("user", JSON.stringify(credential));

          Toast("Registeration Succesfull", ToastType.success);

          navigate("/sendverifyemail");
     } catch (error: any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response.data.message, ToastType.error);
     }
}


export const logout = (email: string, Toast: Function, navigate: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/logout", { email });
          dispatch({ type: Types.SIGNOUT_SUCCESS });
          sessionStorage.clear();
          Toast(res.data.message, ToastType.success);
          navigate("/login");
     } catch (error: any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response.data.message, ToastType.error);
     }
}

export const sendVerifyEmail = (email: string, password: string, Toast: Function) => async (dispatch: Dispatch) => {
     console.log('password: ', password);
     console.log('email: ', email);

     dispatch({ type: Types.AUTH_LOADING });
     try {
          const wait = await axios.post("/user/sentverificationemail", { email, password })

          dispatch({ type: Types.SEND_VERIFY_EMAIL_SUCCESS });

          localStorage.setItem("d1", JSON.stringify(wait))

          Toast("Verification email sent, Please Check your mail", ToastType.success)
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error", ToastType.error)
     }
}

export const verifyemail = (credential: string, Toast: Function, navigate: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/verifyemail", { credential });

          localStorage.setItem("d2", JSON.stringify(credential))

          Toast(res.data.message, ToastType.info);

          if (res.data.status == 401 || res.data.status == 403 || res.data.status == 400) {
               console.log(credential);
               dispatch({ type: Types.VERIFY_EMAIL_SUCCESS, payload: { message: res.data.message } });
               Toast(res.data.message, ToastType.error)
          }
          else {
               dispatch({ type: Types.VERIFY_EMAIL_SUCCESS, payload: { user: res.data.credentials, token: res.data.token } });
               sessionStorage.setItem("token", res.data.token);
               sessionStorage.setItem("user", JSON.stringify(res.data.credentials));
               navigate("/");
          }
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error", ToastType.error)
     }
}

