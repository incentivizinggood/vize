import { Template } from "meteor/templating"; // Used to set up the autoform
import { AutoForm } from "meteor/aldeed:autoform";

//copy-pasted from rateit demo code, jquery-rateit-demo.js
Template.afInputStarRating.rendered = function () {
	// at .created() time, it's too early to run rateit(), so run it at rendered()
	this.$('.rateit').rateit();
}

AutoForm.addInputType("starRating", {
	template: "afInputStarRating",
	valueOut: function() {
		return this.rateit('value');
	},
});
