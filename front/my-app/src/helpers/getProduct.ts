import axios from "axios";

export default async function getProduct(id: number) {
    try {
        const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        return product.data;

    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
    }
};