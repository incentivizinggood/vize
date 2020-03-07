import * as yup from "yup";

import { Random } from "meteor/random";

import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";
import {
	User,
	getUserByUsername,
	hashPassword,
	comparePassword,
} from "imports/api/models";
import { postToSlack } from "imports/api/connectors/slack-webhook";

import { RawUser, processUser } from "../queries/user";

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

	return withMongoDB(async db => {
		const users = db.collection<RawUser>("users");

		if ((await users.findOne({ username })) !== null) {
			throw "username is taken";
		}

		if ((await users.findOne({ "emails.address": email })) !== null) {
			throw "email is taken";
		}

		// Meteor generates a random string instead of using MongoDB's ObjectId.
		// We replicate this behavior here for compatibility with old code.
		// When the users are migrated to PostgreSQL this will be changed.
		const newUserId = Random.id();

		await users.insertOne({
			_id: newUserId,
			username,
			services: {
				password: { bcrypt: await hashPassword(password) },
			},
			emails: [
				{
					address: email,
					verified: false,
				},
			],
			role,
			createdAt: new Date(),
			companyId: null,
		});

		const newUser = await users.findOne({ _id: newUserId });

		if (newUser === null) {
			throw new Error(
				"We just created a user but did not find it. This should be impossible."
			);
		}

		await simpleQuery1<unknown>(
			sql`INSERT INTO users (userMongoId, role) VALUES (${newUser._id}, ${newUser.role}) RETURNING *`
		);

		postToSlack(
			`:tada: A new user has joined Vize. Please welcome \`${newUser.username}\`.`
		);

		return processUser(newUser);
	});
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

	const didMatch = await comparePassword(
		password,
		user.services.password.bcrypt
	);

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

	const didMatch = await comparePassword(
		oldPassword,
		user.services.password.bcrypt
	);

	if (!didMatch) {
		throw "The old password is you gave is incorrect.";
	}

	return withMongoDB(async db => {
		const users = db.collection<RawUser>("users");
		users.updateOne(
			{ username: user.username },
			{
				$set: {
					services: {
						password: { bcrypt: await hashPassword(newPassword) },
					},
				},
			}
		);
	});
}
