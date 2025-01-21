'use client';
import { ShipmentCheckbox } from "../ShipmentCheckbox";
import AddressAutocomplete from "../GoogleAddress";
import { OrderFormProps } from "../Order/types";
import { pickupPoints } from "./config";

export default function OrderForm({
    orderDetails,
    onInputChange,
    onContinueToCheckout,
}: OrderFormProps) {

    return (
    <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
        <form className="flex flex-col gap-6 p-4">
            <div className="flex justify-center items-center gap-4 p-4">
                <ShipmentCheckbox 
                    selectedOption={orderDetails.pickupPoint ? "pickup" : "delivery"} 
                    setSelectedOption={(option) => onInputChange({ 
                        target: { 
                            name: "pickupPoint", 
                            value: option === "pickup" ? pickupPoints[0].id : null,
                     }, 
                    } as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
            </div>

            <div>
                <label
                    htmlFor="name"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={orderDetails.name}
                    onChange={onInputChange}
                    id="name"
                    className="
                        w-full 
                        rounded-lg
                        border-0
                        border-b
                        border-gray-300
                        bg-transparent
                        focus:border-cyan-700
                        focus:ring-0
                        placeholder-gray-400
                        text-sm
                        py-2
                    "
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label
                    htmlFor="phone"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Phone Number
                </label>
                <input
                    type="text"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={onInputChange}
                    id="phone"
                    className="
                        w-full 
                        rounded-lg
                        border-0
                        border-b
                        border-gray-300
                        bg-transparent
                        focus:border-cyan-700
                        focus:ring-0
                        placeholder-gray-400
                        text-sm
                        py-2
                    "
                    placeholder="(555) 123-4567"
                />
            </div>

            {orderDetails.pickupPoint === null && <AddressAutocomplete />}
            {orderDetails.pickupPoint && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Pickup Points</h2>
                    <ul className="space-y-4">
                        {pickupPoints.map((point) => (
                            <li
                                key={point.id}
                                className="flex justify-between items-center border-b border-gray-300 pb-4 last:border-b-0"
                            >
                                <div>
                                    <h3 className="text-base font-medium text-cyan-700">{point.name}</h3>
                                    <p className="text-sm text-gray-600">{point.address}</p>
                                    <p className="text-sm text-gray-500">Hours: {point.hours}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-cyan-700 border-gray-300 rounded-xl focus:ring-cyan-600"
                                    checked={orderDetails.pickupPoint === point.id}
                                    onChange={() => onInputChange({ target: { name: "pickupPoint", value: point.id } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                                    aria-label={`Select ${point.name}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={onContinueToCheckout}
                    className="
                        bg-transparent 
                        text-cyan-700
                        hover:text-cyan-600 
                        hover:duration-200 ease-in-out
                        font-semibold 
                        rounded-lg 
                        py-3 
                        px-6 
                    "
                >
                    Continue to Checkout
                </button>
            </div>
        </form>
    </div>
    );
}

