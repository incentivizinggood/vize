import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
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

Template.afInputLocation.helpers({
	shouldHavePanelHeader() {
		// don't render header for singular location,
		// but only to differentiate multiple locations
		return this.atts.name !== "location";
	},
	getItemName() {
		return this.atts.name;
	},
	getItemNumber() {
		if (this.atts.name === "location") return "1";
		else if (this.atts.name.startsWith("locations.")) {
			const index = Number(this.atts.name.substring(10));
			return String(index + 1);
		}
		return undefined;
	},
	subFieldNameFor(subFieldName) {
		return `${this.atts.name}.${subFieldName}`;
	},
	subFieldIdFor(subFieldName) {
		return `${this.atts.id}.${subFieldName}`;
	},
});

AutoForm.addInputType("location", {
	template: "afInputLocation",
	valueOut() {
		if (this.children().length === 0) return undefined;
		const children = this.children();
		console.log(children);
		return {
			city: children[0].children[1].value,
			address: children[1].children[1].value,
			industrialHub: children[2].children[1].value,
		};
	},
});
