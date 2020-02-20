import * as yup from "yup";

import sql from "imports/lib/sql-template";
import {
	Transaction,
	execTransactionRW,
	simpleQuery,
} from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";
import {
	User,
	getUserByUsername,
	hashPassword,
	comparePassword,
} from "imports/api/models";
import { postToSlack } from "imports/api/connectors/slack-webhook";

import { attributes } from "../queries/user";

// This was for the MongoDB users.
export type RawUser = {
	_id: string;
	username: string;
	createdAt: Date;
	role: "worker" | "company-unverified" | "company";
	companyId: number | null;
	services: { password: { bcrypt: string } };
	emails: {
		address: string;
		verified: boolean;
	}[];
};

// Migrate user data from MongoDB to PostgreSQL.
export async function migrateUsers() {
	const transaction: Transaction<unknown> = async client => {
		const users = await withMongoDB(async db =>
			db
				.collection<RawUser>("users")
				.find({})
				.toArray()
		);

		for (const user of users) {
			await client.query(sql`
				UPDATE users
				SET
					username = ${user.username},
					email_address = ${user.emails.length > 0 ? user.emails[0].address : null},
					password_hash = ${user.services.password.bcrypt}
				WHERE usermongoid = ${user._id}
			`);
		}
	};

	console.log("Starting user migration.");
	await execTransactionRW(transaction);
	console.log("Finished user migration.");
}

type CreateUserInput = {
	username: string;
	email: string;
	password: string;
	role: "worker" | "company";
};

namespace CreateUserInput {
	export const schema = yup.object({
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
	});
}

export async function createUser(input: CreateUserInput): Promise<User> {
	const {
		username,
		email,
		password,
		role,
	} = await CreateUserInput.schema.validate(input, {
		abortEarly: false,
	});

	const transaction: Transaction<User> = async client => {
		if (
			(await client.query(
				sql`SELECT userid FROM users WHERE username=${username}`
			)).rows.length > 0
		) {
			throw "username is taken";
		}

		if (
			(await client.query(
				sql`SELECT userid FROM users WHERE email_address=${email}`
			)).rows.length > 0
		) {
			throw "email is taken";
		}

		const passwordHash = await hashPassword(password);

		const {
			rows: [user],
		} = await client.query(sql`
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
	};

	return execTransactionRW(transaction);
}

type VerifyUserInput = {
	username: string;
	password: string;
};

namespace VerifyUserInput {
	export const schema = yup.object({
		username: yup
			.string()
			.trim()
			.required(),
		password: yup.string().required(),
	});
}

export async function verifyUser(input: VerifyUserInput): Promise<User> {
	const { username, password } = await VerifyUserInput.schema.validate(
		input,
		{
			abortEarly: false,
		}
	);

	const user = await getUserByUsername(username);

	if (!user) {
		throw "username does not match any account";
	}

	const didMatch = await comparePassword(password, user.passwordHash);

	if (!didMatch) {
		throw "password is incorrect";
	}

	return user;
}

export async function changePassword(
	user: User | undefined | null,
	oldPassword: string,
	newPassword: string
) {
	if (!user) {
		throw "You must be logged in to change your password.";
	}

	const didMatch = await comparePassword(oldPassword, user.passwordHash);

	if (!didMatch) {
		throw "The old password is you gave is incorrect.";
	}

	const newPasswordHash = await hashPassword(newPassword);

	await simpleQuery(sql`
		UPDATE users
		SET password_hash = ${newPasswordHash}
		WHERE username = ${user.username}
	`);
}
