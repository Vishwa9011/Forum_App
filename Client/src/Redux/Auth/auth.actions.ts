import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";
import { UserI } from "../../Constants/constant";
import { ToastType } from "../../Custom-Hooks/Toast"


export const GoogleAuth = () => async (dispatch: Dispatch) => {
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

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/login", { email, password });
          console.log('res: ', res);
          sessionStorage.setItem("user", JSON.stringify(res.data.credentials));

          dispatch({ type: Types.SIGNIN_SUCCESS, })
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR })
     }
}

export const signup = (userData: UserI, navigate: Function, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/register", userData);
          dispatch({ type: Types.SIGNUP_SUCCESS, payload: res.data.credentials });
          console.log(res.data)
          sessionStorage.setItem("user", JSON.stringify(res.data.credentials));
          Toast("Registeration Succesfull", ToastType.success);
          navigate("/sendverifyemail");
     } catch (error: any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response?.data?.message || "Server Error", ToastType.error);
     }
}


export const logout = (email:string,Toast:Function,navigate:Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/logout", {email});
          dispatch({type:Types.SIGNOUT_SUCCESS});
          localStorage.clear();
          Toast(res.data.message,ToastType.success);
          navigate("/");
     } catch (error:any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response.data.message || "Server Error",ToastType.error);
     }
}

export const sendVerifyEmail = (email: string, password: string,Toast:Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/sentverificationemail", { email, password })
          dispatch({ type: Types.SEND_VERIFY_EMAIL_SUCCESS,payload: res.data.EncryptedCredential });
          console.log(res)
          Toast("Verification email sent, Please Check your mail",ToastType.success)
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error", ToastType.error)
     }
}

export const verifyemail = (credential: string, Toast: Function, navigate: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/verifyemail", { credential });
          
          Toast(res.data.message,ToastType.info);
          if(res.data.status==401 || res.data.status==403 || res.data.status==400){
               console.log(credential);
               dispatch({ type: Types.VERIFY_EMAIL_SUCCESS,payload: {message:res.data.message}});
               navigate("/login");
          } 
          else{
               dispatch({ type: Types.VERIFY_EMAIL_SUCCESS,payload: {user : res.data.credentials, token : res.data.token}});
               localStorage.setItem("token",res.data.token);
               localStorage.setItem("user",JSON.stringify(res.data.credentials));
               navigate("/");
          }
     } catch (err) {
          console.log(err)
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error", ToastType.error)
     }
}

