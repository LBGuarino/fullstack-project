import axios from "axios";  
import { IProduct } from "@/interfaces/IProduct";


export const getProducts = async (): Promise<IProduct[]> => {
    const fetch = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return fetch.data;
};
