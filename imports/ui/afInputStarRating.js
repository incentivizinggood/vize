import { Template } from "meteor/templating"; // Used to set up the autoform
import { AutoForm } from "meteor/aldeed:autoform";

//copy-pasted from rateit demo code, jquery-rateit-demo.js
if(Meteor.isClient) {
	Template.afInputStarRating.rendered = function () {
		// at .created() time, it's too early to run rateit(), so run it at rendered()
		this.$('.rateit').rateit();
	}
}

AutoForm.addInputType("starRating", {
	template: "afInputStarRating",
	valueOut: function() {
		let rating = this.rateit('value');
		if(rating === 0) { // user did not click the star
			return undefined; //...but this field is required
		}
		else {
			return rating;
		}
	},
});
