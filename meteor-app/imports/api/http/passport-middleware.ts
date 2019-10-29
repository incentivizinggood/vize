import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { Express } from "express";

import {
	User,
	getUserByUsername,
	getUserById,
	createUser,
	comparePassword,
} from "imports/api/models";

/** Check that the username and password match an account in the database. */
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

/** Set up the users and authentication middleware. */
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

	app.post("/register", async function(req, res) {
		// TODO: Add checking and handling of errors and bad input.
		const user = await createUser(
			req.body.username,
			req.body.password,
			req.body.role
		);

		// Automatically log the new user in.
		req.login(user, function(err) {
			if (err) {
				console.log(err);
			}
		});

		// Return username and id in case the client wants to redirect.
		res.json({
			user: {
				id: user._id,
				username: user.username,
			},
		});
	});
}