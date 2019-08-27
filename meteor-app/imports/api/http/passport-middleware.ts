import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { Express } from "express";
import { getUserByUsername, getUserById } from "../models";

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

	const didMatch = bcrypt.compare(password, user.services.password.bcrypt);

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

	app.post("/login", passport.authenticate("local"));
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});
}
