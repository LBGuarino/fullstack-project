import axios from "axios";

export default async function getProduct(id: number) {
    try {
        const product = await axios.get(`http://localhost:3001/products/${id}`);
        return product.data;

    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
    }
};