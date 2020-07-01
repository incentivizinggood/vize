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

export const login = async (username: string, password: string) =>
	fetch(
		new Request(`${location.origin}/api/login`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				username,
				password,
			}),
		})
	).then(afterLoginOrLogout);

export const logout = async () =>
	fetch(
		new Request(`${location.origin}/api/logout`, {
			method: "POST",
		})
	).then(afterLoginOrLogout);

export const register = async (options: {
	username: string;
	email: string;
	password: string;
	role: "worker" | "company";
}) =>
	fetch(
		new Request(`${location.origin}/api/register`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(options),
		})
	).then(afterLoginOrLogout);

export const changePassword = async (options: {
	oldPassword: string;
	newPassword: string;
}) =>
	fetch(
		new Request(`${location.origin}/api/change-password`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(options),
		})
	);
