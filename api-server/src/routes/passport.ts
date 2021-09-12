import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Router } from "express";
import * as yup from "yup";
import connectPgSimple from "connect-pg-simple";
import expressSession from "express-session";

import { pool } from "src/connectors/postgresql";

import {
	User,
	getUserById,
	createUser,
	verifyUser,
	changePassword,
	authWithFacebook,
	requestPasswordReset,
	resetPassword,
} from "src/models";

/** Set up the users and authentication middleware. */
export const router = Router();

// Warn if the SESSION_SECRET is not given. This is needed to sign the
// session cookies and prevent spoofing.
if (!process.env.SESSION_SECRET) {
	console.error(
		"The environment variable SESSION_SECRET is not set.",
		"The default value will be used. This is insecure."
	);
}

router.use(
	expressSession({
		store: new (connectPgSimple(expressSession))({ pool }),
		secret: process.env.SESSION_SECRET || "keyboard cat",
		resave: false,
		saveUninitialized: false,
		cookie: {
			// Only send session cookies over secured HTTPS
			// when not in a development environment.
			secure: process.env.NODE_ENV !== "development",
			// Do not allow client side scripts to access the session cookie.
			httpOnly: true,
		},
	})
);

passport.serializeUser<User, string>(function (user, done) {
	done(null, user ? user.userId.toString() : undefined);
});

passport.deserializeUser<User, string>(async function (id, done) {
	const user = await getUserById(parseInt(id));
	// I'm not sure if this is correct.
	// We may need to return an error if the user is not found.
	done(null, user === null ? undefined : user);
});

router.use(passport.initialize());
router.use(passport.session());

// TODO: HTTP 401 Not Authorized errors may not be the right code for
// these errors. Perhaps 409 Conflict would be better?

router.post("/login", async function (req, res, next) {
	try {
		const user = await verifyUser(req.body);

		req.logIn(user, function (err) {
			if (err) {
				throw err;
			}
			// We assume the login was made by an API call.
			// Return id in case the client wants to redirect.
			res.json({
				user: {
					id: user.userId,
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

router.post("/logout", function (req, res) {
	req.logout();

	// We assume the logout was made by an API call.
	// We do not have any data to return.
	res.end();
});

router.post("/register", async function (req, res, next) {
	try {
		const user = await createUser(req.body);

		// Automatically log the new user in.
		req.logIn(user, function (err) {
			if (err) {
				throw err;
			}
			// Return id in case the client wants to redirect.
			res.json({
				user: {
					id: user.userId,
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

router.post("/change-password", async function (req, res, next) {
	try {
		await changePassword(req.user as User, req.body);

		res.end();
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

// English Translation for Route: "/request-password-resets"
router.post(
	"solicitud-para-restablecer-contraseña",
	async function (req, res, next) {
		try {
			await requestPasswordReset(req.body);

			res.end();
		} catch (e) {
			if (e instanceof yup.ValidationError) {
				res.status(400).json({ errors: e.errors });
			} else if (typeof e === "string") {
				res.status(400).json({ errors: [e] });
			} else {
				next(e);
			}
		}
	}
);

// English Translation for Route: "/reset-password"
router.post("/restablecer-contraseña", async function (req, res, next) {
	try {
		await resetPassword(req.body);

		res.end();
	} catch (e) {
		if (e instanceof yup.ValidationError) {
			res.status(400).json({ errors: e.errors });
		} else if (typeof e === "string") {
			res.status(400).json({ errors: [e] });
		} else {
			next(e);
		}
	}
});

if (
	process.env.ROOT_URL &&
	process.env.FACEBOOK_APP_ID &&
	process.env.FACEBOOK_APP_SECRET
) {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: `${process.env.ROOT_URL}/api/auth/facebook/callback`,
				profileFields: ["id", "emails"],
				passReqToCallback: true,
			},
			async function (_req, _accessToken, _refreshToken, profile, cb) {
				try {
					console.log("Facebook user profile =", profile);

					// Try to extract the user's email address.
					// We are not guarantied to get the email address.
					const emailAddress =
						profile.emails && profile.emails.length > 0
							? profile.emails[0].value
							: null;

					const user = await authWithFacebook({
						facebookId: profile.id,
						emailAddress,
					});

					return cb(undefined, user);
				} catch (err) {
					return cb(err, undefined);
				}
			}
		)
	);

	router.get(
		"/auth/facebook",
		passport.authenticate("facebook", {
			scope: ["email", "public_profile"],
		})
	);

	router.get(
		"/auth/facebook/callback",
		passport.authenticate("facebook", { failureRedirect: "/login" }),
		function (_req, res) {
			// Successful authentication, redirect home.
			res.redirect("/");
		}
	);
} else {
	console.warn(
		"Not setting up Facebook login. One or more of ROOT_URL, FACEBOOK_APP_ID, and FACEBOOK_APP_SECRET are not set."
	);
}
