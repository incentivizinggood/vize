import * as yup from "yup";

import { Random } from "meteor/random";

import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";
import { User, hashPassword } from "imports/api/models";
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
			.max(32),
		email: yup.string().email(),
		password: yup
			.string()
			.min(1)
			.max(256),
		role: yup.mixed<"worker" | "company">().oneOf(["worker", "company"]),
	});
}

export async function createUser(input: CreateUserInput): Promise<User> {
	const {
		username,
		email,
		password,
		role,
	} = await CreateUserInput.schema.validate(input);

	return withMongoDB(async db => {
		const users = db.collection<RawUser>("users");

		if ((await users.findOne({ username })) !== null) {
			throw new Error("That username is taken.");
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
