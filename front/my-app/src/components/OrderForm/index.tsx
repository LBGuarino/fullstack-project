'use client';
import { ShipmentCheckbox } from "../ShipmentCheckbox";
import AddressAutocomplete from "../GoogleAddress";
import { OrderFormProps } from "../Order/types";
import { pickupPoints } from "./config";
import { useForm } from "react-hook-form";
import { OrderFormInputs, orderFormSchema } from "@/helpers/validations";
import { zodResolver } from "@hookform/resolvers/zod";

export default function OrderForm({
    register,
    errors,
    watchPickupPoint,
    setValue,
    onContinueToCheckout,
}: OrderFormProps) {

    const handleShipmentChange = (option: "delivery" | "pickup") => {
        if (option === "pickup") {
            setValue('pickupPoint', pickupPoints[0].id);
            setValue('address', undefined);
        } else {
            setValue('pickupPoint', null);
        }
    }

    return (
    <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
        <form className="flex flex-col gap-6 p-4" onSubmit={onContinueToCheckout}>
            <div className="flex justify-center items-center gap-4 p-4">
                <ShipmentCheckbox 
                    selectedOption={watchPickupPoint ? "pickup" : "delivery"} 
                    setSelectedOption={handleShipmentChange}
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Email
                </label>
                <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
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
                    placeholder="you@example.com"
                />
                {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

            </div>
            <div>
                <label
                    htmlFor="name"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Full Name
                </label>
                <input
                    {...register("name")}
                    type="text"
                    name="name"
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
                {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

            </div>
            <div>
                <label
                    htmlFor="phone"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Phone Number
                </label>
                <input
                    {...register("phone")}
                    type="text"
                    name="phone"
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
                {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
            </div>

            {watchPickupPoint === null && <AddressAutocomplete errors={errors} register={register} setValue={setValue} />}
            {watchPickupPoint && (
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
                                    {...register('pickupPoint')}
                                    value={point.id}
                                    className="w-4 h-4 text-cyan-700 border-gray-300 rounded-xl focus:ring-cyan-600"
                                    checked={Number(watchPickupPoint) === point.id}
                                    onChange={() => setValue('pickupPoint', point.id)}
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

