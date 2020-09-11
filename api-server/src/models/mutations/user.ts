import * as yup from "yup";

import sql from "src/utils/sql-template";
import { pool } from "src/connectors/postgresql";
import {
	User,
	getUserByUsername,
	hashPassword,
	comparePassword,
} from "src/models";
import { postToSlack } from "src/connectors/slack-webhook";

import { attributes } from "../queries/user";

const createUserInputSchema = yup
	.object({
		username: yup
			.string()
			.trim()
			.min(1)
			.max(32)
			.required(),
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
	const {
		username,
		email,
		password,
		role,
	} = await createUserInputSchema.validate(input, {
		abortEarly: false,
	});

	const passwordHash = await hashPassword(password);

	try {
		const {
			rows: [user],
		} = await pool.query(sql`
			INSERT INTO users 
				(username, email_address, password_hash, role) 
			VALUES 
				(${username}, ${email}, ${passwordHash}, ${role}) 
			RETURNING ${attributes}
		`);

		postToSlack(
			`:tada: A new user has joined Vize. Please welcome \`${username}\`.`
		);

		return user;
	} catch (err) {
		if (err.constraint === "users_username_key") {
			throw `That username is already taken. Please choose a different one.`;
		}

		if (err.constraint === "users_email_address_key") {
			throw `That email address is used by another account. Please use a different one.`;
		}

		throw err;
	}
}

const verifyUserInputSchema = yup
	.object({
		username: yup
			.string()
			.trim()
			.required(),
		password: yup.string().required(),
	})
	.required();

export async function verifyUser(input: unknown): Promise<User> {
	const { username, password } = await verifyUserInputSchema.validate(input, {
		abortEarly: false,
	});

	const user = await getUserByUsername(username);

	if (!user) {
		throw "username does not match any account";
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
		WHERE username = ${user.username}
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

	/* If this is the first time that the user has logged in with Facebook
	 * then create a new account for the user. If this is not the first
	 * time, try to get the user's email_address if we do not already have it.
	 */
	const {
		rows: [user],
	} = await pool.query(sql`
		insert into users
			(facebook_id, role, email_address)
		values
			(${facebookId}, ${role}, ${emailAddress})
		on conflict (users_facebook_id_key) do update set
			email_address = coalesce(
				users.email_address,
				excluded.email_address
			)
		returning ${attributes}
	`);

	return user;
}
