import passport from "passport";
import { Express } from "express";

import {
	User,
	getUserByUsername,
	getUserById,
	createUser,
	comparePassword,
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

	app.post("/login", async function(req, res, next) {
		if (req.body.username) {
			if (typeof req.body.username === "string") {
				if (req.body.password) {
					if (typeof req.body.password === "string") {
						const user = await getUserByUsername(req.body.username);
						if (user) {
							const didMatch = await comparePassword(
								req.body.password,
								user.services.password.bcrypt
							);
							if (didMatch) {
								req.logIn(user, function(err) {
									if (err) {
										return next(err);
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
							} else {
								res.send(401, "Password is incorrect.");
							}
						} else {
							res.send(
								401,
								"Username does not match any account."
							);
						}
					} else {
						res.send(401, "Password must be a string.");
					}
				} else {
					res.send(401, "Password is required.");
				}
			} else {
				res.send(401, "Username must be a string.");
			}
		} else {
			res.send(401, "Username is required.");
		}
	});

	app.post("/logout", function(req, res) {
		req.logout();

		// We assume the logout was made by an API call.
		// We do not have any data to return.
		res.end();
	});

	app.post("/register", async function(req, res) {
		try {
			const user = await createUser({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				role: req.body.role,
			});

			// Automatically log the new user in.
			req.login(user, function(err) {
				if (err) {
					console.log(err);
				}
			});

			// Return username and id in case the client wants to redirect.
			res.json({
				user: {
					id: user.userId,
					username: user.username,
				},
			});
		} catch (error) {
			res.status(500).json(error);
		}
	});
}
