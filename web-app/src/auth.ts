import client from "./startup/graphql";

// NOTE: The user's logged in state is tracked by a session.
// In order for this authentication system to work these requests
// and the api requests must share the "connect.sid" cookie.

/**
 * Handle some tasks that need to happen when the user's authentication state changes.
 */
function afterLoginOrLogout<T>(x: T): T {
	// Nuke the GraphQL cache to prevent cache errors.
	// This is inefficient, but it will only happen when
	// the user logs in and logs out so it doesn't matter.
	client.resetStore();

	// Pass the response unchanged.
	return x;
}

export async function login(
	loginId: string,
	password: string
): Promise<unknown> {
	const x = await fetch(
		new Request(`${location.origin}/api/login`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				username: loginId,
				password,
			}),
		})
	);

	return afterLoginOrLogout(x);
}

export async function logout(): Promise<unknown> {
	const x = await fetch(
		new Request(`${location.origin}/api/logout`, {
			method: "POST",
		})
	);

	return afterLoginOrLogout(x);
}

export async function register(options: {
	email: string;
	password: string;
	role: "worker" | "company";
}): Promise<unknown> {
	const x = await fetch(
		new Request(`${location.origin}/api/register`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(options),
		})
	);

	return afterLoginOrLogout(x);
}

export function changePassword(options: {
	oldPassword: string;
	newPassword: string;
}): Promise<unknown> {
	return fetch(
		new Request(`${location.origin}/api/change-password`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(options),
		})
	);
}
