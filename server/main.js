import { Meteor } from "meteor/meteor";
import "../imports/api/data/reviews.js";
import "../imports/api/data/companies.js";

//BUG FIXED For real guys, you can't use Methods defined
//in methods.js unless you include them here. I'm thinking
//we have a lot to learn about loading order in Meteor.
import "../imports/api/data/methods.js";

Meteor.startup(() => {
    // code to run on server at startup
});
