/**
 * Get the property at a given "path".
 */
export function getAtPath(object: any, path: string): any {
	if (path === "") return object;
	return path.split(".").reduce((a, c) => a[c], object);
}

/**
 * Join paths together.
 */
export function joinPaths(a: string, b: string): string {
	if (a === "") return b;
	if (b === "") return a;
	return `${a}.${b}`;
}
