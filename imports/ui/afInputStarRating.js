import { Template } from "meteor/templating"; // Used to set up the autoform
import { AutoForm } from "meteor/aldeed:autoform";

/*
	In case you haven't looked at .meteor/packages or
	.meteor/versions, this code uses dandv:jquery-rateit
	to do the heavy lifting. In the html file, the span's
	class attribute expresses this, and the data-rateit-resetable
	attribute is something that the package understands.

	Package site: https://atmospherejs.com/dandv/jquery-rateit
	Example code: http://gjunge.github.io/rateit.js/examples/
*/

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
