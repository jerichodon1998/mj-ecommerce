import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Familjen_Grotesk } from "next/font/google";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const grotesk = Familjen_Grotesk({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<div className={grotesk.className}>
				<Header />
				<div className="mb-32 pt-10 pb-5 mx-5 sm:mx-10 lg:mx-16 xl:mx-20">
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</Provider>
	);
}
