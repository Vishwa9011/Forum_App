import { LoginCred, LoginRes } from "../../../Constants/Constants";
import axios from "axios"

export const signin = async(payload:LoginCred) =>{
    try {
        let res = await axios.post(`${process.env.BASE_URL}/user/login`,payload);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}