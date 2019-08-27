import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { Express } from "express";
import { MongoClient } from "mongodb";

const verify: VerifyFunction = async (username, password, done) => {
	console.warn(`Attempting login with ${username} and ${password}.`);

	const client = await MongoClient.connect("mongodb://localhost:27017", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = client.db("meteor");

	const collection = db.collection("users");
	const user = await collection.findOne({ username });

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

	/*	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		const user = Meteor.users.findOne({ _id: id });

		done(null, user);
    });
    */

	app.use(passport.initialize());
	//app.use(passport.session());

	app.post("/login", passport.authenticate("local", {}), function(req, res) {
		console.warn(`DSFHSFGHJSD`);
		res.redirect("/");
	});
}
