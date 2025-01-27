import { ILogin } from "@/interfaces/ILogin";
import axios, { AxiosError } from "axios";

export const loginUser = async (userData: ILogin) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
};

export default loginUser;