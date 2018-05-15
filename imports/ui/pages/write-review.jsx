//Boilerplate first
import React from 'react';
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import { withTracker } from "meteor/react-meteor-data";
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var";
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";


//Specific stuff second
import { Reviews } from "../../api/data/reviews.js";
import { Companies } from "../../api/data/companies.js";
import "./wr_blaze_form.html";

//Weird that I have to import both of these here,
//rather than import the .html in the .js and just
//import the .js here, but Meteor complains if I don't,
//so whatever...
import "../afInputStarRating.html";
import "../afInputStarRating.js";

let wr_form_state = new ReactiveDict();
wr_form_state.set("formError", "good"); // Shared with AutoForm helpers
wr_form_state.set("companyId", undefined); // Shared with the React wrapper
wr_form_state.set("company", undefined);

if(Meteor.isClient) {

	Template.wr_blaze_form.onCreated(function() {
		let id = wr_form_state.get("companyId");
		if(id !== undefined){ // no need to go to all that trouble if we're on the home page
			this.autorun(function() {
				Meteor.call("companies.findOne", id, (error, result) => {
					if (!result) {
						wr_form_state.set("company", undefined);
					}
					else {
						wr_form_state.set("company", result);
					}
				});
			});
		}
	});

	Template.wr_blaze_form.onRendered(function() {
		console.log("Rendering wr_blaze_form");
	})

	Template.wr_blaze_form.helpers({
		reviews: Reviews,
		ErrorWidget: function() {
			return ErrorWidget;
		},
		shouldHaveCompany: function() {
			return wr_form_state.get("companyId") !== undefined;
		},
		getCompanyName: function() {
			let company = wr_form_state.get("company");
			if(company === undefined) {
				return "ERROR: COMPANY NOT FOUND";
			}
			else {
				return company.name;
			}
		},
		hasError: function() {
			return wr_form_state.get("formError") !== "good";
		},
		error: function() {
			return wr_form_state.get("formError");
		},
		resetFormError: function() { //called when reset button is clicked
			console.log("Resetting wr_review_form");
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
}


export default class WriteReviewForm extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {

		wr_form_state.set("companyId",this.props.companyId);

		return (
			<div className="page WriteReviewForm">
				<Blaze template="wr_blaze_form"/>
			</div>
		);
	}
}

WriteReviewForm.propTypes = {
	companyId: PropTypes.string,
};
