import { Meteor } from "meteor/meteor";
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import { Email } from 'meteor/email'
import "../imports/api/data/methods.js";
Meteor.startup(() => {
    // code to run on server at startup
    // process.env.MAIL_URL = "smtps://postmaster%40sandbox085524be907b4b94a0b2f76d2191562e.mailgun.org:203f125f4d3c81d383498ce114168309-bdd08c82-e4078cdc@smtps.mailgun.org:587";

    /* Imports for server-side startup go here. */
    console.log("SERVER: before call2");
    Meteor.call(
        "sendEmail",
        "udjiogan@yahoo.com",
        "perfectpud@yahoo.com",
        "You sent an email!",
        "Hello,\n\n\tThis is indeed the text of an email, good job.\n\nSincerely,\n\n\tJoshua Higginbotham\n\n",
        (err,res) => {
            if (err) {
                console.log("--- BEGIN error:");
                console.log(err);
				console.log("--- END error")
            } else {
                console.log("--- BEGIN success:");
                console.log(res);
				console.log("--- END success")
            }
        }
    );
    console.log("SERVER: after call");

});
