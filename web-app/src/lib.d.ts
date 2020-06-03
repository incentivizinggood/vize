declare module "react-star-ratings" {
	const StarRatings: React.ComponentType<any>;
	export default StarRatings;
}

// Let TypeScript know that it can import images files.
declare module "*.png" {
	const url: string;
	export default url;
}
declare module "*.jpg" {
	const url: string;
	export default url;
}
