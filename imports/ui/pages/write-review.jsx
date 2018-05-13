//Boilerplate first
import React from 'react';
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";


//Specific stuff second
import { Reviews } from "../../api/data/reviews.js";
import "./wr_blaze_form.html";

//Weird that I have to import both of these here,
//rather than import the .html in the .js and just
//import the .js here, but Meteor complains if I don't,
//so whatever...
import "../afInputStarRating.html";
import "../afInputStarRating.js";

let wr_form_state = new ReactiveDict();
wr_form_state.set("formError", "good");

Template.wr_blaze_form.helpers({
	reviews: Reviews,
	ErrorWidget: function() {
		return ErrorWidget;
	},
	hasError: function() {
		return wr_form_state.get("formError") !== "good";
	},
	error: function() {
		return wr_form_state.get("formError");
	},
	resetFormError: function() { //called when reset button is clicked
		wr_form_state.set("formError", "good");
	},
});

AutoForm.addHooks("wr_blaze_form", {
	onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
		console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
		wr_form_state.set("formError", "good");
	},
	onError: function(formType, error) { // "error" contains whatever error object was thrown
		console.log("ERROR: We did a thing in a " + formType + " form: " + error);
		wr_form_state.set("formError", error.toString());
	},
});

export default class WriteReviewForm extends React.Component {
	constructor (props) {
		super(props);
		//console.log("GOT AN ID: " + this.props.companyId);
	}
	render() {
		return (
			<div className="page WriteReviewForm">
				<Blaze template="wr_blaze_form"/>
			</div>
		);
	}
}
