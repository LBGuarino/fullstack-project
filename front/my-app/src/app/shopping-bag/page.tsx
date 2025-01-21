import { GoogleMapsProvider } from "@/components/GoogleMapsProvider";
import Order from "@/components/Order";
import OrderForm from "@/components/OrderForm";
import ShoppingCartPC from "@/components/ShoppingCartPC";

export default function ShoppingBag() {
    return (
        
    <div className="flex flex-col md:flex-row w-full h-screen">
        <GoogleMapsProvider>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
                <Order />
            </div>
        </GoogleMapsProvider>
        <div className="flex-1 bg-white flex items-center justify-center p-4">
            <ShoppingCartPC />
        </div>
    </div>
    )
};