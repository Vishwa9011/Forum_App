import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";
import { IUser, UserI } from "../../Constants/constant";
import { ToastType } from "../../Custom-Hooks/Toast"


export const getUser = (id: string, Toast: Function) => async (dispatch: Dispatch) => {
     if (!id) return;
     dispatch({ type: Types.AUTH_LOADING });
     try {
          const response = await axios.get(`/user/${id}`,);

          dispatch({ type: Types.SIGNIN_SUCCESS, payload: response.data.credentials });

          sessionStorage.setItem("user", JSON.stringify({ id: response.data.credentials._id, token: response.data.token }));

     } catch (error: any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response?.data?.message || "Server Error", ToastType.error);
     }
}

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

          const response = await axios.post("/user/googleauth", userDetail)
          console.log('response: ', response);


          sessionStorage.setItem("user", JSON.stringify({ id: response.data.credentials._id, token: response.data.token }));


          Toast("Login Success", ToastType.success);

          dispatch({ type: Types.SIGNIN_SUCCESS, payload: response.data.credentials })

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
          if (res.data.status == 401 || res.data.status == 403 || res.data.status == 400) {
               dispatch({ type: Types.AUTH_ERROR, payload: res.data.message });
               Toast(res.data?.message || "Something went wrong", ToastType.error)
               navigate("/login");
          }
          else {
               dispatch({ type: Types.SIGNIN_SUCCESS, payload: res.data.credentials });
               sessionStorage.setItem("user", JSON.stringify({ id: res.data.credentials._id, token: res.data.token }));
               console.log(res.data.credentials)
               Toast(res.data?.message || "Login Success", ToastType.success);
               navigate("/");
          }
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR })
     }
}

export const signup = (userData: UserI, navigate: Function, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/register", userData);
          dispatch({ type: Types.SIGNUP_SUCCESS, payload: res.data.credentials });
          sessionStorage.setItem("user", JSON.stringify({ id: res.data.credentials._id }));
          Toast("Registeration Succesfull", ToastType.success);
          navigate("/sendverifyemail");
     } catch (error: any) {
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response?.data?.message || "Server Error", ToastType.error);
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
          Toast(error.response.data.message || "Server Error", ToastType.error);
     }
}

export const sendVerifyEmail = (email: string, password: string, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     try {
          let res = await axios.post("/user/sentverificationemail", { email, password })
          dispatch({ type: Types.SEND_VERIFY_EMAIL_SUCCESS, payload: res.data.EncryptedCredential });
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
          if (res.data.status == 401 || res.data.status == 403 || res.data.status == 400) {
               dispatch({ type: Types.VERIFY_EMAIL_FAIL, payload: { message: res.data.message } });
               Toast(res.data?.message || "Something went wrong", ToastType.error)
               navigate("/login");
          }
          else {
               dispatch({ type: Types.VERIFY_EMAIL_SUCCESS, payload: res.data.credentials });
               sessionStorage.setItem("user", JSON.stringify(res.data.credentials));
               Toast(res.data?.message || "Login Success", ToastType.success)
               navigate("/");
          }
     } catch (err) {
          dispatch({ type: Types.AUTH_ERROR });
          Toast("Server Error", ToastType.error);
     }
}

export const updateUser = (userData: IUser, onClose: Function, Toast: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.AUTH_LOADING });
     const id = userData._id;
     console.log(id)
     try {
          let res = await axios.post(`user/update/${id}`, userData);
          if (res.data.status == 401) {
               dispatch({ type: Types.USER_UPDATE_FAIL, payload: { message: res.data.message } });
               Toast(res.data?.message || "Something went wrong", ToastType.error);
               onClose();
          }
          else {
               dispatch({ type: Types.USER_UPDATE_SUCCESS, payload: res.data.credentials });
               sessionStorage.setItem("user", JSON.stringify(res.data.credentials));
               Toast(res.data?.message || "User successfully updated", ToastType.success);
               onClose();
          }
     } catch (error: any) {
          console.log(error)
          dispatch({ type: Types.AUTH_ERROR })
          Toast(error.response?.data?.message || "Server Error", ToastType.error);
     }
}

export const followUser = (data: { userID: string, followingID: string }, Toast: Function) => async (dispatch: Dispatch<any>) => {
     try {
          await axios.post("/user/follow", data);
          dispatch(getFollowing(data.userID, Toast))
     } catch (error) {
          console.log('error: ', error);
          Toast("Unable to Follow, Please try again.", ToastType.error)
     }
}

export const unFollowUser = (data: { userID: string, followingID: string }, Toast: Function) => async (dispatch: Dispatch<any>) => {
     try {
          const res = await axios.post("/user/unfollow", data);
          dispatch(getFollowing(data.userID, Toast))
     } catch (error) {
          console.log('error: ', error);
     }
}


export const getFollower = (userID: string, Toast: Function) => async (dispatch: Dispatch<any>) => {
     try {
          const response = await axios.get(`/user/${userID}/follower`);
          dispatch({ type: Types.GET_USER_FOLLOWER, payload: response.data.followers })
     } catch (error) {
          console.log('error: ', error);
     }
}

export const getFollowing = (userID: string, Toast: Function) => async (dispatch: Dispatch<any>) => {
     try {
          const response = await axios.get(`/user/${userID}/following`);
          dispatch({ type: Types.GET_USER_FOLLOWING, payload: response.data.following })
     } catch (error) {
          console.log('error: ', error);
     }
}