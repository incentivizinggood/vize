import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";
import "../imports/api/data/votes.js";
import "../imports/api/data/methods.js";

if (Meteor.isServer) {
	const db = new LiveMysql({
		host: "localhost",
		port: 3306,
		user: process.env.MYSQL_USR,
		password: process.env.MYSQL_PW,
		database: "vize",
	});

	const closeAndExit = function() {
		db.end();
		process.exit();
	};

	process.on("SIGTERM", closeAndExit);
	process.on("SIGINT", closeAndExit);

	console.log("First success!");
}

Meteor.startup(() => {
	// code to run on server at startup
});
