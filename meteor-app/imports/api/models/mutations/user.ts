import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";
import { User, hashPassword } from "imports/api/models";
import { Random } from "meteor/random";

// TODO: Validate and sanitize inputs.
export async function createUser(
	username: string,
	password: string,
	role: "worker" | "company"
): Promise<User> {
	return withMongoDB(async db => {
		const users = db.collection<User>("users");

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

		return newUser;
	});
}
