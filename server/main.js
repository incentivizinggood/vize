import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import { Email } from 'meteor/email'
import "../imports/api/data/users.js";
// This should also be imported here, but this file has errors which are being
// fixed on another branch. Leave this commented out until the fixes are merged.
import "../imports/api/data/methods.js";

Meteor.startup(() => {
<<<<<<< HEAD
    // code to run on server at startup
    // process.env.MAIL_URL = "***REMOVED***";
    // process.env.MAIL_URL = "***REMOVED***";
//    process.env.MAIL_URL = "***REMOVED***";
    process.env.MAIL_URL = "***REMOVED***";

    // Meteor.call(
    //     "sendEmail",
    //     "urelperfect@gmail.com",
    //     "postmaster@incentivizinggood.com",
    //     "You sent an email!",
    //     "Hello,\n\n\t New email before email .\n\nSincerely,\n\n\tUrel Djiogan\n\n",
    //     (err, res) => {
    //         if (err) {
    //             console.log("--- BEGIN error:");
    //             console.log(err);
    //             console.log("--- END error")
    //         } else {
    //             console.log("--- BEGIN success:");
    //             console.log(res);
    //             console.log("--- END success")
    //         }
    //     }
    // );
});
=======
	// code to run on server at startup
	// process.env.MAIL_URL = "***REMOVED***";
	process.env.MAIL_URL =  "***REMOVED***";

	/* Imports for server-side startup go here. */
	console.log("SERVER: before call2");
	Meteor.call(
		"sendEmail",
		"perfectpud@yahoo.com",
		"postmaster@mg.incentivizinggood.com",
		"You received an Email!",
		"Hey Urel,\n\n\tDid a bid of cleanup and wanted to check things again. Hope you're doing well.\n\nSincerely,\n\n\tJoshua Higginbotham\n\n",
		(err,res) => {
			if (err) {
				console.log("--- BEGIN error:");
				console.log(err);
				console.log("--- END error");
			} else {
				console.log("--- BEGIN success:");
				console.log(res);
				console.log("--- END success");
			}
		}
	);
	console.log("SERVER: after call");

});
>>>>>>> 716f72695707486f3b8760a22548b650570401aa
