import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";

import { Company, User, getCompanyById } from "imports/api/models";

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

export async function processUser(rawUser: RawUser): Promise<User> {
	const { _id, ...restUser } = rawUser;
	const userId = await getUserPostgresId(_id);
	return {
		userId,
		...restUser,
	};
}

async function processUserN(rawUser: RawUser | null): Promise<User | null> {
	if (rawUser === null) return null;

	return processUser(rawUser);
}

function mapM<A, B>(f: (x: A) => Promise<B>): (xs: A[]) => Promise<B[]> {
	return xs => Promise.all(xs.map(f));
}

// Get the user with a given id.
export async function getUserById(id: number): Promise<User | null> {
	const userMongoId = await getUserMongoId(id);
	return withMongoDB(db =>
		db.collection<RawUser>("users").findOne({ _id: userMongoId })
	).then(processUserN);
}

// Get the user with a given username.
export async function getUserByUsername(
	username: string
): Promise<User | null> {
	return withMongoDB(db =>
		db.collection<RawUser>("users").findOne({ username })
	).then(processUserN);
}

// Get all users administering a given company.
export async function getUsersByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<User[]> {
	return withMongoDB(db =>
		db
			.collection<RawUser>("users")
			.find({ companyId: company.companyId })
			.toArray()
	).then(mapM(processUser));
}

// Get the company administered by a given user.
export async function getCompanyOfUser(user: User): Promise<Company | null> {
	if (user.companyId) {
		return getCompanyById(user.companyId);
	}
	return null;
}

// Get the integer ID of a user's PostgreSQL entry
async function getUserPostgresId(id: string): Promise<number> {
	return simpleQuery1<{ userid: number }>(
		sql`SELECT userid FROM users WHERE usermongoid=${id}`
	).then(x => {
		if (x === null) throw new Error("Could not find user with id.");
		return x.userid;
	});
}

// Get the string ID of a user's MongoDB document
async function getUserMongoId(id: number): Promise<string> {
	return simpleQuery1<{ usermongoid: string }>(
		sql`SELECT usermongoid FROM users WHERE userid=${id}`
	).then(x => {
		if (x === null) throw new Error("Could not find user with id.");
		return x.usermongoid;
	});
}
