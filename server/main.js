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