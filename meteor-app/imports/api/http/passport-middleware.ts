import passport from "passport";
import { Express } from "express";
import * as yup from "yup";

import {
	User,
	getUserById,
	createUser,
	verifyUser,
	changePassword,
} from "imports/api/models";

/** Set up the users and authentication middleware. */
export function applyPassportMiddleware(app: Express) {
	passport.serializeUser<User, string>(function(user, done) {
		done(null, user ? user.userId.toString() : undefined);
	});

	passport.deserializeUser<User, string>(async function(id, done) {
		const user = await getUserById(parseInt(id));
		// I'm not sure if this is correct.
		// We may need to return an error if the user is not found.
		done(null, user === null ? undefined : user);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	// TODO: HTTP 401 Not Authorized errors may not be the right code for
	// these errors. Perhaps 409 Conflict would be better?

	app.post("/login", async function(req, res, next) {
		try {
			const user = await verifyUser({
				username: req.body.username,
				password: req.body.password,
			});

			req.logIn(user, function(err) {
				if (err) {
					throw err;
				}
				// We assume the login was made by an API call.
				// Return username and id in case the client wants to redirect.
				res.json({
					user: {
						id: user.userId,
						username: user.username,
					},
				});
			});
		} catch (e) {
			if (e instanceof yup.ValidationError) {
				res.status(401).json({ errors: e.errors });
			} else if (typeof e === "string") {
				res.status(401).json({ errors: [e] });
			} else {
				next(e);
			}
		}
	});

	app.post("/logout", function(req, res) {
		req.logout();

		// We assume the logout was made by an API call.
		// We do not have any data to return.
		res.end();
	});

	app.post("/register", async function(req, res, next) {
		try {
			const user = await createUser({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				role: req.body.role,
			});

			// Automatically log the new user in.
			req.logIn(user, function(err) {
				if (err) {
					throw err;
				}
				// Return username and id in case the client wants to redirect.
				res.json({
					user: {
						id: user.userId,
						username: user.username,
					},
				});
			});
		} catch (e) {
			if (e instanceof yup.ValidationError) {
				res.status(401).json({ errors: e.errors });
			} else if (typeof e === "string") {
				res.status(401).json({ errors: [e] });
			} else {
				next(e);
			}
		}
	});

	app.post("/change-password", async function(req, res, next) {
		try {
			await changePassword(
				req.user,
				req.body.oldPassword,
				req.body.newPassword
			);
		} catch (e) {
			if (e instanceof yup.ValidationError) {
				res.status(401).json({ errors: e.errors });
			} else if (typeof e === "string") {
				res.status(401).json({ errors: [e] });
			} else {
				next(e);
			}
		}
	});
}
