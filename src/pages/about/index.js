import Image from "next/image";

const textDesign = "text-2xl font-semibold text-primary";

const AboutPage = () => {
	return (
		<div className="bg-secondary/10 p-5 text-secondary rounded-md text-lg grid grid-flow-row gap-4">
			<div className="text-2xl flex justify-center font-bold">Ecommerce Personal Project</div>
			<div>
				This project is developed using <span className={textDesign}>MongoDB</span>,
				<span className={textDesign}> ExpressJs</span>,{" "}
				<span className={textDesign}>NextJs</span> and{" "}
				<span className={textDesign}>NodeJs</span>{" "}
				<Image
					className="inline"
					src="https://skillicons.dev/icons?i=mongodb,express,nextjs,nodejs"
					alt="Tech Stack"
					width={160}
					height={160}
				/>{" "}
				this is very similar to MERN stack, the difference is the frontend framework that I
				used is NextJs (a flexible React framework that gives you building blocks to create
				fast web applications)
			</div>
			<div>
				I have used some third party packages with my frontend, such as{" "}
				<span className={textDesign}>Tailwind CSS</span>{" "}
				<Image
					className="inline"
					src="https://skillicons.dev/icons?i=tailwind"
					alt="Tech Stack"
					width={40}
					height={40}
				/>
				&mdash; to design my components easier, <span className={textDesign}>Axios</span>
				&mdash;for my API requests, <span className={textDesign}>Redux Toolkit</span>{" "}
				<Image
					className="inline"
					src="https://skillicons.dev/icons?i=redux"
					alt="Tech Stack"
					width={40}
					height={40}
				/>
				&mdash;for my state management, MUI-icons{" "}
				<Image
					className="inline"
					src="https://skillicons.dev/icons?i=materialui"
					alt="Tech Stack"
					width={40}
					height={40}
				/>
				&mdash;for my icons.
			</div>
			<div>
				For my backend, I also used some third party packages,{" "}
				<span className={textDesign}>mongoose</span>&mdash;a mongodb wrapper,{" "}
				<span className={textDesign}>morgan</span>&mdash;HTTP request logger middleware for
				node.js, <span className={textDesign}>multer & multer-gridfs-storage</span>
				&mdash;handling file uploads/downloads,{" "}
				<span className={textDesign}>jsonwebtoken</span>
				&mdash;authentication tokens, <span className={textDesign}>bcrypt</span>
				&mdash;encrypting database passwords,{" "}
				<span className={textDesign}>cookie-parser</span>&mdash;cater cookies,
				<span className={textDesign}>express-async-handlers</span>&mdash;asynchronus express
				functions, <span className={textDesign}>cors</span>&mdash;allowing specific domains
				to access requests, <span className={textDesign}>dotenv</span>&mdash;for env
				variables
			</div>
		</div>
	);
};

export default AboutPage;
