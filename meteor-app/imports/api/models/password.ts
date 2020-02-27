import bcrypt from "bcrypt";
import crypto from "crypto";

function prehash(password: string): string {
	// For some reason Meteor's account system hashed passwords before
	// passing them to bcrypt. We must replicate that behavior here so that
	// password hashes from the old database will still work.
	return crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
	const passwordHash = await bcrypt.hash(prehash(password), 10);

	return passwordHash;
}

export async function comparePassword(
	password: string,
	bcryptHash: string
): Promise<boolean> {
	const didMatch = await bcrypt.compare(prehash(password), bcryptHash);

	return didMatch;
}
