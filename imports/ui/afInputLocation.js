import { Meteor } from "meteor/meteor";
// import { Template } from "meteor/templating"; // Used to set up the autoform
import { AutoForm } from "meteor/aldeed:autoform";

/*
	Blaze.js template code for the custom input type for locations,
	which is used on the form for reviews, job posts, salaries, and
	company profiles.
	This input type is supposed to return an object that satisfies
	the SimpleSchema constrains in imports/api/data/location.js.
*/

AutoForm.addInputType("location", {
	template: "afInputLocation",
	valueOut() {
		const inputFields = this.children();
		const cityInput = inputFields[0].value;
		const addressInput = inputFields[1].value;
		const industrialHubInput = inputFields[2].value;

		if (Meteor.isDevelopment) {
			console.log("CUSTOM LOCATION INPUT TYPE GOT VALUES: ");
			console.log(`city: ${cityInput}`);
			console.log(`address: ${addressInput}`);
			console.log(`industrialHub: ${industrialHubInput}`);
		}

		return {
			city: cityInput,
			address: addressInput,
			industrialHub: industrialHubInput,
		};
	},
});
