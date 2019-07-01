// Let TypeScript know that it can import .graphql files.
declare module "*.graphql" {
	import { DocumentNode } from "graphql";
	const defaultDocument: DocumentNode;
	export default defaultDocument;
}
