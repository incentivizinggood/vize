import { MongoClient, Db } from "mongodb";

// Connection URL
// This encodes everything needed to connect to the database.
// eg. username, password, hostname, port, and database name.
const url = process.env.MONGO_URL;

export async function withMongoDB<T>(
	f: (db: Db) => Promise<T> | T
): Promise<T> {
	const client = await MongoClient.connect(url as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	// Do not provide the database name here.
	// It should be given as part of the database url.
	const db = client.db();

	const r = f(db);
	const r1 = r instanceof Promise ? await r : r;

	client.close();
	return r1;
}

export function testConnection() {
	console.log("Testing connection to the MongoDB database.");
	withMongoDB(() => console.log("Successfully connected to MongoDB."));
}
