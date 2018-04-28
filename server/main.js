import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/users.js";
// This should also be imported here, but this file has errors which are being
// fixed on another branch. Leave this commented out until the fixes are merged.
// import "../imports/api/data/methods.js";

Meteor.startup(() => {
    // code to run on server at startup
});
