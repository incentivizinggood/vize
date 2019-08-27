import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { Express } from "express";

import { withDb } from "imports/api/connectors/mongodb";

const slakdjf: VerifyFunction = (username, password, done) => {
	console.warn(`Attempting login with ${username} and ${password}.`);

	withDb(db => {
		const collection = db.collection("users");
		collection.findOne({ username }).then(function(user) {
			if (!user) {
				console.warn(`User not found.`);
				return done(null, false, { message: `User not found.` });
			}

			console.log("Found a user.");
			console.log(user);
			console.log(password, user.services.password.bcrypt);

			bcrypt.compare(password, user.services.password.bcrypt, function(
				err,
				res
			) {
				if (err) {
					console.warn(`There was a compare error.`, err);
					return done(err, { message: `There was a compare error.` });
				}

				if (!res) {
					console.warn(`The password did not match.`);
					return done(null, false, {
						message: `The password did not match.`,
					});
				}

				console.warn(`Successful login.`);
				return done(null, user, { message: `Successful login.` });
			});
		});
	});
};

export function applyPassportMiddleware(app: Express) {
	console.warn(`applyPassportMiddleware`);
	passport.use(new LocalStrategy(slakdjf));

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
