//Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";

//Specific stuff second
import { JobAds } from "../../api/data/jobads.js";
import { Companies } from "../../api/data/companies.js";
import "./paj_blaze_form.html";

let paj_form_state = new ReactiveDict();
paj_form_state.set("formError", "good"); // Shared with AutoForm helpers
paj_form_state.set("companyId", undefined); // Shared with the React wrapper
paj_form_state.set("company", {name: "Please wait while we finish loading the form..."});

if(Meteor.isClient) {

	Template.paj_blaze_form.onCreated(function() {
		this.autorun(function() {
			Meteor.call("companies.companyForCurrentUser", (error, result) => {
				if (!result) {
					paj_form_state.set("company", undefined);
				}
				else {
					paj_form_state.set("company", result);
				}
			});
		});
	});

	Template.paj_blaze_form.onRendered(function() {
		if(Meteor.isDevelopment) console.log("Rendering paj_blaze_form");
	});

	Template.paj_blaze_form.helpers({
		jobAds: JobAds,
		ErrorWidget: function() {
			return ErrorWidget;
		},
		getCompanyName: function() {
			let company = paj_form_state.get("company");
			if(company === undefined) {
				return "ERROR: COMPANY PROFILE NOT FOUND (LOG IN AND/OR CREATE A PROFILE TO POST A JOB)";
			}
			else {
				return company.name;
			}
		},
		hasError: function() {
			return paj_form_state.get("formError") !== "good";
		},
		error: function() {
			return paj_form_state.get("formError");
		},
		resetFormError: function() { //called when reset button is clicked
			paj_form_state.set("formError", "good");
		},
	});

	AutoForm.addHooks("paj_blaze_form", {
		onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
			if(Meteor.isDevelopment) console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
			paj_form_state.set("formError", "good");
		},
		onError: function(formType, error) { // "error" contains whatever error object was thrown
			if(Meteor.isDevelopment) console.log("ERROR: We did a thing in a " + formType + " form: " + error);
			paj_form_state.set("formError", error.toString());
		},
	});
}

export default class PostAJobForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {

		return (
			<div className="page PostAJobForm">
				<Blaze template="paj_blaze_form"/>
			</div>
		);
	}
}
