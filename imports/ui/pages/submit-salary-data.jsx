//Boilerplate first
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";

//Specific stuff second
import { Salaries } from "../../api/data/salaries.js";
import { Companies } from "../../api/data/companies.js";
import "./ssd_blaze_form.html";

let ssd_form_state = new ReactiveDict();
ssd_form_state.set("formError", "good"); // Shared with AutoForm helpers
ssd_form_state.set("companyId", undefined); // Shared with the React wrapper
ssd_form_state.set("company", {name: "Please wait while we finish loading the form..."});

if(Meteor.isClient) {

	Template.ssd_blaze_form.onCreated(function() {
		let id = ssd_form_state.get("companyId");
		if(Meteor.isDevelopment) console.log("received id: " + id);
		if(id !== undefined) {
			this.autorun(function() {
				Meteor.call("companies.findOne", id, (error, result) => {
					if (!result) {
						ssd_form_state.set("company", undefined);
					}
					else {
						ssd_form_state.set("company", result);
					}
				});
			});
		}
	});

	Template.ssd_blaze_form.onRendered(function() {
		if(Meteor.isDevelopment) console.log("Rendering ssd_blaze_form");
	});

	Template.ssd_blaze_form.helpers({
		salaries: Salaries,
		ErrorWidget: function() {
			return ErrorWidget;
		},
		shouldHaveCompany: function() {
			return ssd_form_state.get("companyId") !== undefined;
		},
		getCompanyName: function() {
			let company = ssd_form_state.get("company");
			if(company === undefined) {
				return "ERROR: COMPANY NOT FOUND";
			}
			else {
				return company.name;
			}
		},
		hasError: function() {
			return ssd_form_state.get("formError") !== "good";
		},
		error: function() {
			return ssd_form_state.get("formError");
		},
		resetFormError: function() { //called when reset button is clicked
			if(Meteor.isDevelopment) console.log("Resetting ssd_review_form");
			ssd_form_state.set("formError", "good");
		},
	});

	AutoForm.addHooks("ssd_blaze_form", {
		onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
			if(Meteor.isDevelopment) console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
			ssd_form_state.set("formError", "good");
		},
		onError: function(formType, error) { // "error" contains whatever error object was thrown
			if(Meteor.isDevelopment) console.log("ERROR: We did a thing in a " + formType + " form: " + error);
			ssd_form_state.set("formError", error.toString());
		},
	});
}

export default class SubmitSalaryDataForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {

		ssd_form_state.set("companyId",this.props.companyId);

		return (
			<div className="page SubmitSalaryDataForm">
				<Blaze template="ssd_blaze_form"/>
			</div>
		);
	}
}

SubmitSalaryDataForm.propTypes = {
	companyId: PropTypes.string,
};
