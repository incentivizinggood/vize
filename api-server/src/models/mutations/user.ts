import * as yup from "yup";
import { nanoid } from "nanoid";

import sql from "src/utils/sql-template";
import { pool } from "src/connectors/postgresql";
import { sendEmail } from "src/connectors/email";
import {
	User,
	getUserByLogin,
	hashPassword,
	comparePassword,
} from "src/models";
import { postToSlack } from "src/connectors/slack-webhook";

import { attributes } from "../queries/user";

const createUserInputSchema = yup
	.object({
		email: yup
			.string()
			.email()
			.required(),
		password: yup
			.string()
			.min(1)
			.max(256)
			.required(),
		role: yup
			.mixed<"worker" | "company">()
			.oneOf(["worker", "company"])
			.required(),
	})
	.required();

export async function createUser(input: unknown): Promise<User> {
	const { email, password, role } = await createUserInputSchema.validate(
		input,
		{
			abortEarly: false,
		}
	);

	const passwordHash = await hashPassword(password);

	try {
		const {
			rows: [user],
		} = await pool.query(sql`
			INSERT INTO users
				(email_address, password_hash, role)
			VALUES
				(${email}, ${passwordHash}, ${role})
			RETURNING ${attributes}
		`);

		postToSlack(
			`:tada: A new user has joined Vize. Please welcome user with email: \`${user.emailAddress}\`.`
		);

		return user;
	} catch (err) {
		if (err.constraint === "users_email_address_key") {
			// Error in English: "That email address is used by another account. Please use a different one."
			throw `Esa dirección de correo electrónico es utilizada por otra cuenta. Utilica una diferente.`;
		}

		throw err;
	}
}

const verifyUserInputSchema = yup
	.object({
		loginId: yup
			.string()
			.trim()
			.required(),
		password: yup.string().required(),
	})
	.required();

export async function verifyUser(input: unknown): Promise<User> {
	const { loginId, password } = await verifyUserInputSchema.validate(input, {
		abortEarly: false,
	});

	const user = await getUserByLogin(loginId);

	if (!user) {
		// Combining username and password incorrect in one place for better security
		// Error in English: "The username or password is incorrect. Try again."
		throw "El nombre de usuario o la contraseña que especificaste son inválidos. Vuelve a intentarlo.";
	}

	if (!user.passwordHash) {
		// Error in English: You do not have a password set. You must login some other way.
		throw "No tienes una contraseña establecida. Debes iniciar una sesión a través de Facebook.";
	}

	const didMatch = await comparePassword(password, user.passwordHash);

	if (!didMatch) {
		// Combining username and password incorrect in one place for better security
		// Error in English: "The username or password is incorrect. Try again."
		throw "El nombre de usuario o la contraseña que especificaste son inválidos. Vuelve a intentarlo.";
	}

	return user;
}

const changePasswordInputSchema = yup
	.object({
		oldPassword: yup.string().required(),
		newPassword: yup.string().required(),
	})
	.required();

export async function changePassword(
	user: User | undefined | null,
	input: unknown
): Promise<void> {
	const {
		oldPassword,
		newPassword,
	} = await changePasswordInputSchema.validate(input, {
		abortEarly: false,
	});

	if (!user) {
		// Error in English: "You must be logged in to change your password."
		throw "Debes iniciar una sesión para cambiar tu contraseña.";
	}

	if (!user.passwordHash) {
		// Error in English: "You do not have a password set, which means you can not change it. Login with Facebook instead."
		throw "No tienes una contraseña establecida. Inicia una sesión con Facebook.";
	}

	const didMatch = await comparePassword(oldPassword, user.passwordHash);

	if (!didMatch) {
		// Error in English: "The old password is you gave is incorrect."
		throw "La contraseña anterior que proporcionaste es incorrecta.";
	}

	const newPasswordHash = await hashPassword(newPassword);

	await pool.query(sql`
		UPDATE users
		SET password_hash = ${newPasswordHash}
		WHERE userid = ${user.userId}
	`);
}

const authWithFacebookInputSchema = yup
	.object({
		facebookId: yup.string().required(),
		role: yup
			.mixed<"worker" | "company">()
			.oneOf(["worker", "company"])
			.default("worker")
			.required(),
		emailAddress: yup.string().nullable(),
	})
	.required();

/** Creates or verifies user. */
export async function authWithFacebook(input: unknown): Promise<User> {
	const {
		facebookId,
		role,
		emailAddress,
	} = await authWithFacebookInputSchema.validate(input, {
		abortEarly: false,
	});

	// Check if this user has logged in with Facebook before.
	const { rows } = await pool.query(sql`
		SELECT ${attributes}
		FROM users
		WHERE facebook_id=${facebookId}
	`);

	if (rows.length === 0) {
		// This is the first time that the user has logged in with Facebook.
		// Create a new account for the user.
		const {
			rows: [user],
		} = await pool.query(sql`
			INSERT INTO users
				(facebook_id, role, email_address)
			VALUES
				(${facebookId}, ${role}, ${emailAddress})
			RETURNING ${attributes}
		`);

		postToSlack(`:tada: A new user has joined Vize.`);

		return user;
	} else {
		return rows[0];
	}
}

const requestPasswordResetInputSchema = yup
	.object({
		emailAddress: yup
			.string()
			.email()
			.required(),
	})
	.required();

export async function requestPasswordReset(input: unknown): Promise<void> {
	const { emailAddress } = await requestPasswordResetInputSchema.validate(
		input,
		{
			abortEarly: false,
		}
	);

	const { userid: userId } =
		(await pool.query<{ userid: number }>(sql`
			SELECT userid
			FROM users
			WHERE email_address=${emailAddress}
			LIMIT 1
		`)).rows[0] || {};

	if (userId === undefined) {
		// English Translation: "There is no user with that email address."
		throw "No hay ningún usuario con ese correo electrónico.";
	}

	const passwordResetRequestId = nanoid();

	await pool.query(sql`
		INSERT INTO password_reset_requests
			(id, user_id, expiration_date)
		VALUES
			(${passwordResetRequestId}, ${userId}, NOW() + interval '24 hours')
	`);

	await sendEmail({
		templateId: 4,
		to: emailAddress,
		params: {
			passwordResetRequestId,
		},
	});

	postToSlack(`A password reset has been requested for ${emailAddress}.`);
}

const resetPasswordInputSchema = yup
	.object({
		passwordResetRequestId: yup.string().required(),
		newPassword: yup.string().required(),
	})
	.required();

export async function resetPassword(input: unknown): Promise<void> {
	const {
		passwordResetRequestId,
		newPassword,
	} = await resetPasswordInputSchema.validate(input, {
		abortEarly: false,
	});

	const { user_id: userId } =
		(await pool.query<{ user_id: number }>(sql`
			SELECT user_id
			FROM password_reset_requests
			WHERE id = ${passwordResetRequestId} 
			  AND expiration_date > NOW()
			LIMIT 1
		`)).rows[0] || {};

	if (userId === undefined) {
		// English Translation: "This password reset request is invalid or expired."
		throw "Esta solicitud de restablecimiento de contraseña no es válida o se ha expirado.";
	}

	const newPasswordHash = await hashPassword(newPassword);

	await pool.query(sql`
		UPDATE users
		SET password_hash = ${newPasswordHash}
		WHERE userid = ${userId}
	`);

	await pool.query(sql`
		DELETE FROM password_reset_requests
		WHERE id = ${passwordResetRequestId}
	`);
}
