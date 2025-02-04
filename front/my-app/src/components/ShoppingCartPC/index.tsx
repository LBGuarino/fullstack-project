import { CartItem, useCartContext } from "@/context/CartContext";
import Image from "next/image";


export const ShoppingCartPC: React.FC<{ item: CartItem }> = ({
    item: { product: { name, price, image, id }, quantity }
  }) => {
    const { updateQuantity } = useCartContext();

    const productId = id;
    
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
          updateQuantity(productId, newQuantity);
        }
      };
    return (
    <>
        <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center p-3 gap-4" key={id}>
            <div className="w-20 h-20 relative">
            <Image src={image} alt={name} width={100} height={100}/>
            </div>

            <div className="flex flex-col justify-between flex-1">
                <h3 className="text-sm font-medium text-gray-800 truncate">{name}</h3>
                <p className="text-md font-semibold text-cyan-600 mt-1">${price.toFixed(2)}</p>
                <div className="text-sm text-gray-500">
                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
            <button 
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 py-1 bg-gray-100 rounded"
            >
            -
            </button>
            <span>{quantity}</span>
            <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 py-1 bg-gray-100 rounded"
            >
            +
            </button>
            </div>
        </div>
    </>
    )
};

export default ShoppingCartPC;