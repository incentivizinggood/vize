import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import i18n from "meteor/universe:i18n";
import { Reviews } from "../imports/api/data/reviews.js";
import { Companies } from "../imports/api/data/companies.js";
import { Salaries } from "../imports/api/data/salaries.js";
import { JobAds } from "../imports/api/data/jobads.js";
import { Votes } from "../imports/api/data/votes.js";
import { addToAvg } from "../imports/api/data/denormalization.js";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
// import "../imports/api/data/reviews.js";
// import "../imports/api/data/companies.js";
// import "../imports/api/data/salaries.js";
// import "../imports/api/data/users.js";
// import "../imports/api/data/jobads.js";
// import "../imports/api/data/votes.js";
import "../imports/api/data/methods.js";

const mysql = require("mysql");

if (Meteor.isServer) {
	const db = new LiveMysql({
		// "LiveMysql" seems to be auto-imported from numtel:meteor-mysql
		host: "localhost",
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USR,
		password: process.env.MYSQL_PW,
		database: "vize",
	});

	const conn = db.db; // the underlying MySQL database connection, renamed to avoid confusion

	const closeAndExit = function() {
		db.end();
		process.exit();
	};

	process.on("SIGTERM", closeAndExit);
	process.on("SIGINT", closeAndExit);

	Meteor.methods({
		"maria-companies.createProfile"(_newCompanyProfile) {
			// reorder object fields/make sure order matches query, somehow
			// INSERT via conn.query

			let newCompanyProfile = Companies.simpleSchema().clean(
				_newCompanyProfile
			);
			const validationResult = Companies.simpleSchema()
				.namedContext()
				.validate(newCompanyProfile);
			const errors = Companies.simpleSchema()
				.namedContext()
				.validationErrors();

			if (Meteor.isDevelopment) {
				console.log("SERVER: Here is the validation result: ");
				console.log(validationResult);
				console.log(errors);
			}

			if (!validationResult) {
				throw new Meteor.Error(
					i18n.__("common.methods.meteorErrors.invalidArguments"),
					i18n.__("common.methods.errorMessages.invalidFormInputs"),
					errors
				);
			}

			// Make sure the user is logged in before inserting a task
			if (!this.userId) {
				throw new Meteor.Error(
					i18n.__("common.methods.meteorErrors.loggedOut"),
					i18n.__("common.methods.errorMessages.loggedOut")
				);
			}

			const user = Meteor.users.findOne(this.userId);
			if (user.role !== "company") {
				throw new Meteor.Error(
					i18n.__("common.methods.meteorErrors.rolePermission"),
					i18n.__("common.methods.errorMessages.onlyCompanies")
				);
			}

			if (user.companyId !== undefined) {
				throw new Meteor.Error(
					i18n.__("common.methods.meteorErrors.duplicateEntry"),
					i18n.__("common.methods.errorMessages.onlyOnce")
				);
			}
			// BUG must separate Mongo validation from MySQL validation,
			//		especially in cases where validation is done
			//		AGAINST the existing databases
			//	-> NOTE this is mostly completed
			// BUG need to add extra table for locations
			// BUG need to make sure SQL injection doesn't work
			// BUG need to make sure that URL's work
			// NOTE can add denormalization inside triggers
			//		so long as the triggers are called from
			//		a statement executing in a transaction
			// NOTE I should write a SQL script with a bunch of test queries
			// and descriptions of the expected results...

			// not going to deal with this right now
			const locations = newCompanyProfile.locations;
			delete newCompanyProfile.locations;

			// manually create URL's since we're not relying on
			// SimpleSchema/collection2 magic any more
			newCompanyProfile.vizeProfileUrl = encodeURI(
				Meteor.absoluteUrl(
					`companyprofile/?name=${newCompanyProfile.name}`,
					{ secure: true }
				)
			);
			newCompanyProfile.vizeProfileUrl = encodeURI(
				Meteor.absoluteUrl(
					`write-review/?name=${newCompanyProfile.name}`,
					{ secure: true }
				)
			);
			newCompanyProfile.vizeProfileUrl = encodeURI(
				Meteor.absoluteUrl(
					`submit-salary-data/?name=${newCompanyProfile.name}`,
					{ secure: true }
				)
			);
			newCompanyProfile.vizeProfileUrl = encodeURI(
				Meteor.absoluteUrl(
					`post-a-job/?name=${newCompanyProfile.name}`,
					{ secure: true }
				)
			);

			// preparing the query string
			const fieldNames = Object.keys(newCompanyProfile);
			const newValues = Object.values(newCompanyProfile);
			const fieldNamePlaceholders = `(${"??,".repeat(
				fieldNames.length - 1
			)}??)`;
			const newValuePlaceholders = `(${"?,".repeat(
				newValues.length - 1
			)}?)`;

			const companyInsertionQuery = mysql.format(
				`INSERT INTO companies ${fieldNamePlaceholders} VALUES ${newValuePlaceholders}`,
				fieldNames.concat(newValues)
			);

			console.log(fieldNames);
			console.log(newValues);
			console.log(companyInsertionQuery);

			// start transaction
			// it's so good to be back in SQL
			conn.beginTransaction(function(err1) {
				if (err1) {
					console.log(err1);
					throw err1;
				}
				conn.query(companyInsertionQuery, function(
					err2,
					results,
					fields
				) {
					if (err2) {
						return conn.rollback(function() {
							console.log(err2);
							throw err2;
						});
					}
					conn.commit(function(err3) {
						if (err3) {
							return conn.rollback(function() {
								console.log(err3);
								throw err3;
							});
						}
					});
				});
			});
		},
	});
}

Meteor.startup(() => {
	// code to run on server at startup
});
