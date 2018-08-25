import { Meteor } from "meteor/meteor";
// import { Template } from "meteor/templating"; // Used to set up the autoform
import { AutoForm } from "meteor/aldeed:autoform";

/*
	Blaze.js template code for the custom input type for locations,
	which is used on the form for reviews, job posts, salaries, and
	company profiles.
	This input type is supposed to return an object that satisfies
	the SimpleSchema constrains in imports/api/data/location.js.
	WARNING NOTE BUG (POTENTIALLY)
	I need to explain every stinking little aspect of this file
	and its corresonding HTML, because otherwise it will make even
	less sense to everyone else than it does to me.
*/

AutoForm.addInputType("location", {
	template: "afInputLocation",
	valueOut() {
		if (this.children().length === 0) return undefined;

		return {
			city: this.children()[0].children[0].value,
			address: this.children()[1].children[0].value,
			industrialHub: this.children()[2].children[0].value,
		};
	},
});
