interface ProductCounterProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductCounter({ quantity, setQuantity }: ProductCounterProps) {
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }};

    return (
        <div className="flex items-center gap-4">
            <button
            onClick={handleDecrement}
            className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
            aria-label="decrement quantity"
            >
                -
            </button>
            <span>{quantity}</span>
            <button
            onClick={handleIncrement}
            className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
            aria-label="increment quantity"
            >
                +
            </button>
        </div>
    );
};