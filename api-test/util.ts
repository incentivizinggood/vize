export function repeat<T>(n: number, f: (i: number) => T): T[] {
	const x = [];
	for (let i = 0; i < n; ++i) {
		x.push(f(i));
	}
	return x;
}

export async function repeatInParallel<T>(
	n: number,
	f: (i: number) => Promise<T>
): Promise<T[]> {
	const x = [];
	for (let i = 0; i < n; ++i) {
		x.push(f(i));
	}
	return Promise.all(x);
}

export function ignoreExceptions(f) {
	return async function(...args) {
		try {
			return await f(...args);
		} catch (e) {
			console.error(e);
			return undefined;
		}
	};
}
