import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Express } from "express";
import { getUserByUsername, getUserById } from "../models";

async function comparePassword(
	password: string,
	bcryptHash: string
): Promise<boolean> {
	// For some reason Meteor's account system hashed passwords before
	// passing them to bcrypt. We must replicate that behavior here so that
	// password hashes from the old database will still work.
	const passwordPreHashed = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	const didMatch = await bcrypt.compare(passwordPreHashed, bcryptHash);

	return didMatch;
}

const verify: VerifyFunction = async (username, password, done) => {
	console.warn(`Attempting login with ${username} and ${password}.`);

	const user = await getUserByUsername(username);

	if (!user) {
		console.warn(`User not found.`);
		return done(null, false, { message: `User not found.` });
	}

	console.log("Found a user.");
	console.log(user);
	console.log(password, user.services.password.bcrypt);

	const didMatch = await comparePassword(
		password,
		user.services.password.bcrypt
	);

	if (!didMatch) {
		console.warn(`The password did not match.`);
		return done(null, false, {
			message: `The password did not match.`,
		});
	}

	console.warn(`Successful login.`);
	return done(null, user, { message: `Successful login.` });
};

export function applyPassportMiddleware(app: Express) {
	console.warn(`applyPassportMiddleware`);
	passport.use(new LocalStrategy(verify));

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(async function(id, done) {
		const user = await getUserById(id);
		done(null, user);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	app.post("/login", passport.authenticate("local"), function(req, res) {
		res.json({ user: { id: req.user._id } });
	});

	app.post("/logout", function(req, res) {
		req.logout();
		res.json({});
	});
}
