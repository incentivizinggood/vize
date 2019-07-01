// Let TypeScript know that it can import .graphql files.
declare module "*.graphql" {
	const content: any;
	export default content;
}
