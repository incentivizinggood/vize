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

		// Some of the arguments and insertion values may
		// be undefined, but this is perfectly okay,
		// I want there to at least be the option
		newUser = await client.query(
			"INSERT INTO users (userMongoId,role,companyMongoId,companyId) " +
				"VALUES ($1,$2,$3,$4) RETURNING *",
			[user._id, user.role, user.companyId, companyPostgresId]
		);

		return {
			user: newUser.rows[0],
		};
	}

	static async setUserCompanyInfo(client, userId, companyId, companyMongoId) {
		// Expects a userId (string Mongo id
		// or integer Postgres id), the company's
		// integer Postgres id, and the company's
		// string Mongo id. We assume that the
		// caller is the only one who knows all
		// these things, and make no attempt to
		// calculate any of them.
		// Of course, this doesn't particularly
		// handle the case where we want to set
		// companyId or companyMongoId but not both,
		// but I'm not sure when we would encounter
		// that case anyway.
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
				"SET companyid=$1,companymongoid=$2 " +
				"WHERE " +
				selector +
				"=$3 returning *",
			[companyId, companyMongoId, userId]
		);

		return {
			user: newUser.rows[0],
		};
	}
}
