import { CartItem, useCartContext } from "@/context/CartContext";
import Image from "next/image";


export const ShoppingCartPC: React.FC<{ item: CartItem }> = ({
    item: { product: { name, price, image, id }, quantity }
  }) => {
    const { removeFromCart } = useCartContext();
    
    const handleRemoveFromCart = () => {
        removeFromCart(id);
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

            <button onClick={handleRemoveFromCart}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

        </div>
    </>
    )
};

export default ShoppingCartPC;