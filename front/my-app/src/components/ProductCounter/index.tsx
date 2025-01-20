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
        <div>
            <button
            onClick={handleDecrement}
            className="bg-gray-200 rounded-full p-2 text-black"
            aria-label="decrement quantity"
            >
                -
            </button>
            <span>{quantity}</span>
            <button
            onClick={handleIncrement}
            className="bg-gray-200 rounded-full p-2 text-black"
            aria-label="increment quantity"
            >
                +
            </button>
        </div>
    );
};