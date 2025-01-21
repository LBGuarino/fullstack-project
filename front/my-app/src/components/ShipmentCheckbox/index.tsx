interface ShipmentCheckboxProps {
    selectedOption: "delivery" | "pickup" | null;
    setSelectedOption: (option: "delivery" | "pickup" | null) => void;
}

export const ShipmentCheckbox = ({ selectedOption, setSelectedOption }: ShipmentCheckboxProps) => {
    const handleOptionChange = (option: "delivery" | "pickup") => {
        setSelectedOption(option);
    };
    
    return (
        <>
        <h2 className="text-xl font-semibold text-gray-700">Shipment Options</h2>
        <div className="flex gap-8">
            <label
                className={`flex items-center gap-3 px-4 py-3 border rounded-full cursor-pointer transition-all ${selectedOption === "delivery"
                        ? "bg-cyan-700 text-white border-cyan-700"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
            >
                <input
                    type="radio"
                    checked={selectedOption === "delivery"}
                    value="delivery"
                    onChange={() => handleOptionChange("delivery")}
                    className="hidden"
                />
                <span className="text-base font-medium">Delivery</span>
            </label>

            <label
                className={`flex items-center gap-3 px-4 py-3 border rounded-full cursor-pointer transition-all ${selectedOption === "pickup"
                        ? "bg-cyan-700 text-white border-cyan-700"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
            >
                <input
                    type="radio"
                    checked={selectedOption === "pickup"}
                    value="pickup"
                    onChange={() => handleOptionChange("pickup")}
                    className="hidden"
                />
                <span className="text-base font-medium">Pickup</span>
            </label>
        </div>
        </>
    )
};