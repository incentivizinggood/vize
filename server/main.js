import { Meteor } from "meteor/meteor";
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import { Email } from 'meteor/email'

Meteor.startup(() => {
    // code to run on server at startup

    /* Imports for server-side startup go here. */
    process.env.MAIL_URL = "smtps://postmaster@sandbox085524be907b4b94a0b2f76d2191562e.mailgun.org:203f125f4d3c81d383498ce114168309-bdd08c82-e4078cdc@smtp.mailgun.org:587";
});
