/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["skillicons.dev", "https://mj-ecommerce.vercel.app"],
		dangerouslyAllowSVG: true,
	},
};

module.exports = nextConfig;
