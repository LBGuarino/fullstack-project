import axios from "axios";  
import { IProduct } from "@/interfaces/IProduct";


export const getProducts = async (): Promise<IProduct[]> => {
    const fetch = await axios.get(`api/products`);
    return fetch.data;
};
