import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/",
	withCredentials: true,
});
