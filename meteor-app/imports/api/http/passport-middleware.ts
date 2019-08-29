import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Express } from "express";
import { User, getUserByUsername, getUserById } from "../models";

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
	const user = await getUserByUsername(username);

	if (!user) {
		return done(null, false, { message: `User not found.` });
	}

	const didMatch = await comparePassword(
		password,
		user.services.password.bcrypt
	);

	if (!didMatch) {
		return done(null, false, { message: `Incorrect password.` });
	}

	return done(null, user, { message: `Successful login.` });
};

export function applyPassportMiddleware(app: Express) {
	passport.use(new LocalStrategy(verify));

	passport.serializeUser<User, string>(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser<User, string>(async function(id, done) {
		const user = await getUserById(id);
		// I'm not sure if this is correct.
		// We may need to return an error if the user is not found.
		done(null, user === null ? undefined : user);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	app.post("/login", passport.authenticate("local"), function(req, res) {
		// We assume the login was made by an API call.
		// Return username and id in case the client wants to redirect.
		res.json({
			user: {
				id: req.user._id,
				username: req.user.username,
			},
		});
	});

	app.post("/logout", function(req, res) {
		req.logout();

		// We assume the logout was made by an API call.
		// We do not have any data to return.
		res.end();
	});
}
