import request from "request-promise-native";

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
	request({
		method: "POST",
		uri: `${location.origin}/login`,
		body: {
			username,
			password,
		},
		json: true,
	}).then(afterLoginOrLogout);

export const logout = async () =>
	request({
		method: "POST",
		url: `${location.origin}/logout`,
	}).then(afterLoginOrLogout);

export const register = async (options: {
	username: string;
	email: string;
	password: string;
	role: "worker" | "company";
}) =>
	request({
		method: "POST",
		uri: `${location.origin}/register`,
		body: options,
		json: true,
	}).then(afterLoginOrLogout);

export const changePassword = async (options: {
	oldPassword: string;
	newPassword: string;
}) =>
	request({
		method: "POST",
		uri: `${location.origin}/change-password`,
		body: options,
		json: true,
	});
