import { IRegister } from "@/interfaces/IRegister";
import axios, { AxiosError } from "axios";

export const registerUser = async (userData: IRegister) => {
    try {
        const response = await axios.post(`api/users/register`, userData);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
};

export default registerUser;