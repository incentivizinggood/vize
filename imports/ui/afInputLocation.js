import { Template } from "meteor/templating"; // Used to set up the autoform
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
		// const city = this.$("[data-location-subfield=city]");
		// const address = this.$("[data-location-subfield=city]");
		// const industrialHub = this.$("[data-location-subfield=industrialHub]");
		console.log("WHAT IS THIS!?!?!?!?");
		console.log(this);
		console.log("CUSTOM LOCATION INPUT TYPE GOT VALUES: ");
		// console.log(city);
		// console.log(address);
		// console.log(industrialHub);

		return {
			city: "Tijuana",
			address: "some street someplace",
			industrialHub: "El Florido",
		};
	},
});
