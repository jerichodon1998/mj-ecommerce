import MailOutlineIcon from "@mui/icons-material/MailOutline";

const textDesign = "text-2xl font-semibold text-secondary";

const ContactPage = () => {
	return (
		<div className="text-xl border-2 border-primary rounded-md p-10">
			Email me on <MailOutlineIcon fontSize="inherit" className=" w-16 h-16" />{" "}
			<span className={textDesign}>jerichodon1998@gmail.com</span>
			<div>Hire me please, I wanna have a job</div>
		</div>
	);
};

export default ContactPage;
