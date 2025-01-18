import { ILogin } from "@/interfaces/ILogin";
import axios, { AxiosError } from "axios";

export const loginUser = async (userData: ILogin) => {
    try {
        const response = await axios.post('http://localhost:3001/users/login', userData);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
};

export default loginUser;