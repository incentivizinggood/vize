import { MongoClient, Db } from "mongodb";

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = "meteor";

export async function withMongoDB<T>(
	f: (db: Db) => Promise<T> | T
): Promise<T> {
	const client = await MongoClient.connect(url as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = client.db(dbName);

	const r = f(db);
	const r1 = r instanceof Promise ? await r : r;

	client.close();
	return r1;
}

export function testConnection() {
	console.log("Testing connection to the MongoDB database.");
	withMongoDB(() => console.log("Successfully connected to MongoDB."));
}
