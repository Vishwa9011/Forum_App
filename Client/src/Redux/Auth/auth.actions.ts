import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from '../../Configs/Firebase'
import * as Types from "./auth.actionType"
import axios from "axios";


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

          const response = await axios.post("/googleauth", userDetail)
          console.log('response: ', response);

     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.AUTH_ERROR, payload: error });
     }
}


export { GoogleAuth };