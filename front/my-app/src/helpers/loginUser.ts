import { ILogin } from "@/interfaces/ILogin";
import axios from "axios";

export const loginUser = async (userData: ILogin) => {
    try {
        const response = await axios.post('http://localhost:3001/users/login', userData);
        return response.data;
    } catch (error) {
        console.log(`error del back end: ${error}`);
    }
};

export default loginUser;