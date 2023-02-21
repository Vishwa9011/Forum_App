import axios from "axios"
import { RegisterResI, UserI } from "../../../Constants/Constants";


export const registerUser = async(payload:UserI)=>{
    try {
        let res:AxiosResponse<RegisterResI> = await axios.post(`${process.env.BASE_URL}/users/register`,payload);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}