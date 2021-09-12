import axios, { AxiosResponse } from "axios";
import client from "./startup/graphql";

// NOTE: The user's logged in state is tracked by a session.
// In order for this authentication system to work these requests
// and the api requests must share the "connect.sid" cookie.

/**
 * Handle some tasks that need to happen when the user's authentication state changes.
 */
function afterLoginOrLogout(): void {
	// Nuke the GraphQL cache to prevent cache errors.
	// This is inefficient, but it will only happen when
	// the user logs in and logs out so it doesn't matter.
	client.resetStore();
}

export async function login(
	loginId: string,
	password: string
): Promise<AxiosResponse<unknown>> {
	const x = await axios
		.post(`${location.origin}/api/login`, {
			loginId,
			password,
		})
		.catch(function (error) {
			// The error message is currently defaulted to "Request failed with status code 401" so we need to get the response.data.errors in order to get the actual message of the error
			throw Error(error.response.data.errors[0]);
		});

	afterLoginOrLogout();

	return x;
}

export async function logout(): Promise<AxiosResponse<unknown>> {
	const x = await axios.post(`${location.origin}/api/logout`);

	afterLoginOrLogout();

	return x;
}

export async function register(options: {
	email: string;
	password: string;
	role: "worker" | "company";
}): Promise<AxiosResponse<unknown>> {
	const x = await axios
		.post(`${location.origin}/api/register`, options)
		.catch(function (error) {
			// The error message is currently defaulted to "Request failed with status code 401" so we need to get the response.data.errors in order to get the actual message of the error
			throw Error(error.response.data.errors[0]);
		});

	afterLoginOrLogout();

	return x;
}

export async function changePassword(options: {
	oldPassword: string;
	newPassword: string;
}): Promise<AxiosResponse<unknown>> {
	return await axios
		.post(`${location.origin}/api/change-password`, options)
		.catch(function (error) {
			// The error message is currently defaulted to "Request failed with status code 401" so we need to get the response.data.errors in order to get the actual message of the error
			throw Error(error.response.data.errors[0]);
		});
}

export async function requestPasswordReset(options: {
	emailAddress: string;
}): Promise<AxiosResponse<unknown>> {
	// Translation: "request-password-reset"
	return await axios
		.post(
			`${location.origin}/api/solicitud-para-restablecer-contraseña`,
			options
		)
		.catch(function (error) {
			// The error message is currently defaulted to "Request failed with status code 401" so we need to get the response.data.errors in order to get the actual message of the error
			throw Error(error.response.data.errors[0]);
		});
}

export async function resetPassword(options: {
	passwordResetRequestId: string;
	newPassword: string;
}): Promise<AxiosResponse<unknown>> {
	// Translation: "eset-password"
	return await axios
		.post(`${location.origin}/api/restablecer-contraseña`, options)
		.catch(function (error) {
			// The error message is currently defaulted to "Request failed with status code 401" so we need to get the response.data.errors in order to get the actual message of the error
			throw Error(error.response.data.errors[0]);
		});
}
