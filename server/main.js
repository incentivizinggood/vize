import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";

//BUG FIXED For real guys, you can't use Methods defined
//in methods.js unless you include them here. I'm thinking
//we have a lot to learn about loading order in Meteor.
import "../imports/api/data/methods.js";


Meteor.startup(() => {
	// code to run on server at startup
	process.env.MAIL_URL =  "***REMOVED***";
	// console.log("The root URL is: " + process.env.ROOT_URL);
	/* Imports for server-side startup go here. */
	// console.log("SERVER: before call2");
	// Meteor.call(
	// 	"sendEmail",
	// 	"jhigginbotham64@tamu.edu",
	// 	"postmaster@mg.incentivizinggood.com",
	// 	"You received an Email!",
	// 	"Hey Urel,\n\n\tDid a bid of cleanup and wanted to check things again. Hope you're doing well.\n\nSincerely,\n\n\tJoshua Higginbotham\n\n",
	// 	(err,res) => {
	// 		if (err) {
	// 			console.log("--- BEGIN error:");
	// 			console.log(err);
	// 			console.log("--- END error");
	// 		} else {
	// 			console.log("--- BEGIN success:");
	// 			console.log(res);
	// 			console.log("--- END success");
	// 		}
	// 	}
	// );
	// console.log("SERVER: after call");
});
