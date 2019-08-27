import { MongoClient, Db } from "mongodb";

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = "meteor";

export function withDb(f: (db: Db) => unknown) {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		function(err, client) {
			if (err !== null) throw err;

			const db = client.db(dbName);

			f(db);

			client.close();
		}
	);
}

export function testConnection() {
	console.warn(";lasdkjf;lksdaj");

	withDb(() => console.log("Connected successfully to server"));
}
