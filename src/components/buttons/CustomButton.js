import Spinner from "../loader/Spinner";

const CustomButton = ({ children, text, classname, onClick, variant, type, isLoading }) => {
	let styles;

	if (variant == "light") {
		styles =
			"bg-white text-primary border-primary hover:border-white hover:text-white hover:bg-primary ";
	}
	if (variant == "dark") {
		styles =
			"bg-primary text-white border-2 border-white hover:bg-white hover:border-primary hover:text-primary";
	}

	if (variant == "secondary") {
		styles =
			"bg-secondary text-white border-2 border-white hover:bg-white hover:border-primary hover:text-primary";
	}

	return (
		<button
			type={type}
			className={`cursor-pointer flex justify-evenly w-24 h-8 items-center border-2 border-primary ${classname} ${styles}`}
			onClick={onClick}
		>
			{isLoading ? <Spinner /> : null}
			{text}
			{children}
		</button>
	);
};

export default CustomButton;
