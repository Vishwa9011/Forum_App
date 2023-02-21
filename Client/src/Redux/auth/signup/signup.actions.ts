import axios from "axios";
import { Dispatch } from "redux";
import { SIGN_UP_ERROR, SIGN_UP_LOADING, SIGN_UP_SUCCESS } from "./signup.types";
import {UserI} from "../../../Constants/Constants"
import { registerUser } from "./signup.api";


export const signup = (userData:UserI)=>async (dispatch: Dispatch) =>{
    dispatch({ type : SIGN_UP_LOADING });
    try {
        let res = await registerUser(userData);
        dispatch({type: SIGN_UP_SUCCESS,payload: userData});
    } catch (error) {
        dispatch({type: SIGN_UP_ERROR});
    }
}