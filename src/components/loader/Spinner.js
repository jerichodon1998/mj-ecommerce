const Spinner = ({ className }) => {
	return (
		<div
			className={`rounded-full w-6 h-6 border-4 border-primary border-t-white  animate-spin ${className}`}
		/>
	);
};

export default Spinner;
