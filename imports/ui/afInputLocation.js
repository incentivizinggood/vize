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
	/*
		These helper functions are used in the template
		HTML because I wasn't able to figure out how to
		directly access this.atts directly in Blaze outside
		of certain very limited contexts.
		If you want to know how and why each one is used,
		just look at where they're called in the HTML file.
	*/
	shouldHavePanelHeader() {
		// don't render header for singular location,
		// but only to differentiate multiple locations
		return this.atts.name !== "location";
	},
	getItemName() {
		return this.atts.name;
	},
	getItemNumber() {
		/*
			This function is defined for all cases,
			but really only the else should ever
			get executed because of how it's called
			from the template.
		*/
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
		/*
			So apparently valueOut gets called once
			for each element that has the data-schema-key
			attribute defined, but because I want the
			validation and error-handling to work, not
			only do I need to wrap 3 input fields into
			one template, but each one needs to have
			data-schema-key defined, and so does their
			parent div. That is, AFAIK.
			So there are 4 elements with data-schema-key
			defined, and this next if statement causes
			us to ignore all but the outermost, the parent
			of the 3 input fields.
		*/
		if (this.children().length === 0) return undefined;

		/*
			I am aware that at this point I am using
			hard-coded numbers to traverse the DOM tree.
			This works because I personally hard-coded
			the parts of the DOM tree in question,
			although I grant it is not elegant.
			If you know Blaze and/or JQuery well enough
			to come up with a better, cleaner solution,
			be my guest to improve this next bit of code.
		*/
		const children = this.children();
		return {
			city: children[0].children[1].value,
			address: children[1].children[1].value,
			industrialHub: children[2].children[1].value,
		};
	},
});
