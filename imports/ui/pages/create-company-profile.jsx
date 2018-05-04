import React from "react";
import { Companies } from "../../api/data/companies.js";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import MeteorError from "../meteor-error.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var"; // used to hold global state because...you can't "pass props" to Blaze templates

//AutoForm business
import SimpleSchema from "simpl-schema";
import { AutoForm } from "meteor/aldeed:autoform";
SimpleSchema.extendOptions(["autoform"]); // allows us to do a ton of cool stuff with forms

//Until we actually make an account for testing
var Phony = Package['csauer:accounts-phony'].Phony;
Meteor.loginWithPhony(Phony.user);

//now the interesting part...
import "./ccp_blaze_form.html";

let formError = new ReactiveVar("good"); // This code looks easier than it was.

Template.ccp_blaze_form.onCreated(function() {
	this.state = new ReactiveDict();
	this.state.setDefault({
		error: formError.get(),
	});
});
Template.ccp_blaze_form.helpers({
	companyProfiles: Companies,
	MeteorError: function() {
		return MeteorError;
	},
	hasError: function() {
		return formError.get() !== "good";
	},
	error: function() {
		return formError.get();
	},
});
AutoForm.addHooks("ccp_blaze_form", {

	onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
		console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
		formError.set("good");
	},
	onError: function(formType, error) { // "error" contains whatever error object was thrown
		console.log("ERROR: We did a thing in a " + formType + " form: " + error);
		formError.set(error.toString());
	},
});

export default class CompanyCreateProfileForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="page CompanyCreateProfileForm">
				<Blaze template="ccp_blaze_form"/>
			</div>
		);
	}
}
