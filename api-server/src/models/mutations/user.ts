import * as yup from "yup";

import sql from "src/utils/sql-template";
import { pool } from "src/connectors/postgresql";
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
			throw `Esa dirección de correo electrónico es utilizada por otra cuenta. Utilice una diferente.`;
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
		throw "No account was found for that email or username.";
	}

	if (!user.passwordHash) {
		throw "You do not have a password set. You must login some other way.";
	}

	const didMatch = await comparePassword(password, user.passwordHash);

	if (!didMatch) {
		throw "password is incorrect";
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
		throw "You must be logged in to change your password.";
	}

	if (!user.passwordHash) {
		throw "You do not have a password set. You cannot set it with this.";
	}

	const didMatch = await comparePassword(oldPassword, user.passwordHash);

	if (!didMatch) {
		throw "The old password is you gave is incorrect.";
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
