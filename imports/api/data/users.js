import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";
import PostgreSQL from "../graphql/connectors/postgresql.js";
import PgUserFunctions from "../models/helpers/postgresql/users.js";

// The users collection is handled differently than the other collections.
// It exists by default and has some built-in fields. As such it is not created
// here, but is instead modified and tweaked.

// ----- Schema and Data Format -----

Meteor.users.schema = new SimpleSchema({
	// These fields are used by default in Meteor.
	// There is little option to change these as Meteor
	// and some of the packages depend on them.
	_id: {
		type: String,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
	},
	emails: { type: Array, optional: true },
	"emails.$": { type: Object },
	"emails.$.address": {
		type: String,
		// We choose to not do a regex check on email addresses,
		// they will need to get verified anyway so there is no point.
	},
	"emails.$.verified": { type: Boolean },
	createdAt: { type: Date },
	services: { type: Object, blackbox: true },
	// There would normaly be a profile field, but
	// this is not used in this app so it is disabled.

	// These fields are unique to this app.
	// They are not used by Meteor nor any of the packages.
	role: {
		// The role of this user. This is used to present
		// workers and companies with different utilities.
		// For example: A worker should not be able to post a job offer and
		//              a company should not be able to leave a review.
		type: String,
		allowedValues: ["worker", "company-unverified", "company"],
	},
	companyId: {
		// If role === "company", the ID of the company that this user is administering.
		type: String,
		optional: true,
	},
});

Accounts.onCreateUser(function(options, user) {
	// Transfer the custom data fields given to Accounts.createUser into the
	// new user. By default only username, password, and email go though.
	console.log("OPTIONS");
	console.log(options);
	console.log("USER");
	console.log(user);

	return { ...user, role: options.role };
});

// Check that all new users follow the schema defined above.
// This check should get run automatically when a new user is created
// (or is attempted to be created, this check could block that).
Accounts.validateNewUser(user => {
	Meteor.users.schema.validate(user);
	return true;
});

// ----- Security -----

// Deny all client-side updates to user documents.
// The profile field is writable by default, but this is undesired for
// security reasons. All modifications of the database should be handled
// only by the server.
Meteor.users.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

// Since the users collection contians a lot of very sensitive data,
// we must be extra carefull with what is published.

// This is a Mongo field specifier that can act as a
// filter which only allows only public fields through.
Meteor.users.publicFields = {
	username: 1,
	role: 1,
};

if (Meteor.isServer) {
	// Only publish the bear minimum fields by default.
	Meteor.publish("users", function() {
		return Meteor.users.find({}, { fields: Meteor.users.publicFields });
	});
}
