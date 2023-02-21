
import { Dispatch } from "redux";
import { LoginCred } from "../../../Constants/Constants";
import { signin } from "./signin.api";
import { RESET_AUTH, SIGN_IN_ERROR, SIGN_IN_LOADING, SIGN_IN_SUCCESS, SIGN_OUT } from "./signin.types";


const login = (payload:LoginCred)=> async(dispatch:Dispatch)=>{
    dispatch({type: SIGN_IN_LOADING});
    try {
        let res = signin(payload);
        dispatch({type:SIGN_IN_SUCCESS,payload})
    } catch (err) {
        dispatch({type: SIGN_IN_ERROR})
    }
}

const logout = ()=>async(dispatch:Dispatch)=>{
        dispatch({type:RESET_AUTH});
}