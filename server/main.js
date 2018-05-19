import { Meteor } from "meteor/meteor";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";
import "../imports/api/data/salaries.js";
import "../imports/api/data/users.js";
import "../imports/api/data/jobads.js";
import "../imports/api/data/votes.js";

//BUG FIXED For real guys, you can't use Methods defined
//in methods.js unless you include them here. I'm thinking
//we have a lot to learn about loading order in Meteor.
import "../imports/api/data/methods.js";

Meteor.startup(() => {
    // code to run on server at startup
});
