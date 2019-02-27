import { postToSlack } from "/imports/api/connectors/slack-webhook.js";

export default class PgUserFunctions {
	static async getUserById(client, id) {
		// Can take a MongoId (string)
		// or a PostgreSQL id (integer)
		let userResult = { rows: [] };
		let selector;
		if (typeof id === "string") selector = "usermongoid";
		else if (typeof id === "number") selector = "userid";
		else
			throw new Error(
				"illegal argument type: " +
					typeof id +
					" (expects string or number)"
			);

		userResult = await client.query(
			"SELECT * FROM users WHERE " + selector + "=$1",
			[id]
		);

		return {
			user: userResult.rows[0],
		};
	}

	static async createUser(client, user, companyPostgresId) {
		// Assumes that user follows the schema in
		// imports/api/data/users.js
		let newUser = { rows: [] };

		newUser = await client.query(
			"INSERT INTO users (userMongoId,role,companyId) " +
				"VALUES ($1,$2,$3) RETURNING *",
			[user._id, user.role, companyPostgresId]
		);

		postToSlack(
			`:tada: A new user has joined Vize. Please welcome \`${
				user.username
			}\`.`
		);

		return {
			user: newUser.rows[0],
		};
	}

	static async setUserCompanyInfo(client, userId, companyId) {
		// Expects a userId (string Mongo id
		// or integer Postgres id) and the company's
		// integer Postgres id.
		let newUser = { rows: [] };
		let selector;
		if (typeof userId === "string") selector = "usermongoid";
		else if (typeof userId === "number") selector = "userid";
		else
			throw new Error(
				"illegal argument type: " +
					typeof userId +
					" (expects string or number)"
			);

		newUser = await client.query(
			"UPDATE users " +
				"SET companyid=$1 " +
				"WHERE " +
				selector +
				"=$2 RETURNING *",
			[companyId, userId]
		);

		return {
			user: newUser.rows[0],
		};
	}
}
