const btnStyle = "bg-white border-primary border-2 text-primary grid grid-flow-col";
const QuantityComponent = ({ quantity, setQuantity }) => {
	const addQuantity = () => {
		setQuantity(quantity + 1);
	};
	const subtractQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className={btnStyle}>
			<button className="px-2" onClick={subtractQuantity}>
				-
			</button>
			<div className="border-x-2 border-primary p-1">Quantity: {quantity}</div>
			<button className="px-2" onClick={addQuantity}>
				+
			</button>
		</div>
	);
};
export default QuantityComponent;
