import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import { Email } from 'meteor/email'
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";

// BUG FIXED For real guys, you can't use Methods defined
//in methods.js unless you include them here. I'm thinking
//we have a lot to learn about loading order in Meteor.
import "../imports/api/data/methods.js";

Meteor.startup(() => {
    // code to run on server at startup

    /* Imports for server-side startup go here. */
    process.env.MAIL_URL = "smtps://postmaster@sandbox085524be907b4b94a0b2f76d2191562e.mailgun.org:203f125f4d3c81d383498ce114168309-bdd08c82-e4078cdc@smtp.mailgun.org:587";
});
