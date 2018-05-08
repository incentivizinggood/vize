import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Reviews } from "../../api/data/reviews.js";

// Lots of nice boilerplate copy-pasted from
// create-company-profile.jsx

import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import "./write_review_blaze_form.html";

//Weird that I have to import both of these here,
//rather than import the .html in the .js and just
//import the .js here, but Meteor complains if I don't,
//so whatever...
import "../afInputStarRating.html";
import "../afInputStarRating.js";

let formError = new ReactiveVar("good"); // This code looks easier than it was.

Template.write_review_blaze_form.helpers({
	reviews: Reviews,
	ErrorWidget: function() {
		return ErrorWidget;
	},
	hasError: function() {
		return formError.get() !== "good";
	},
	error: function() {
		return formError.get();
	},
	resetFormError: function() { //called when reset button is clicked
		formError.set("good");
	},
});

AutoForm.addHooks("write_review_blaze_form", {
	onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
		console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
		formError.set("good");
	},
	onError: function(formType, error) { // "error" contains whatever error object was thrown
		console.log("ERROR: We did a thing in a " + formType + " form: " + error);
		formError.set(error.toString());
	},
});

export default class WriteReviewPage extends Component {
	constructor (props) {
		super(props);
	}
	render() {
		return (
			<div className="page WriteReviewPage">
				<Blaze template="write_review_blaze_form"/>
			</div>
		);
	}
}
