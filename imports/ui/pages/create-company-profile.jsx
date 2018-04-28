//"standard" imports
import React from "react";
import { Mongo } from "meteor/mongo";
import { Companies } from "../../api/data/companies.js";

//so we can use Blaze packages
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

//autoform business
import SimpleSchema from "simpl-schema";
import { AutoForm } from "meteor/aldeed:autoform";
SimpleSchema.extendOptions(['autoform']);

//now the interesting part...
import "./ccp_blaze_form.html";
Template.ccp_blaze_form.helpers({
	companyProfiles: Companies,
});
AutoForm.addHooks("ccp_blaze_form", {

	after: {
		method: function(error,result) {
			console.log("We entered a neat hook, error: " + error + ", result: " + result);
			// a catch-all callback:
			// error is undefined on success,
			// result is undefined on failure
			// if(error) {
			// 	throw new Meteor.Error("insertion-failed",error);
			// }
			// else if(result) {
			// 	console.log("companies.createProfile: success");
			// }
		},
	},
	onSuccess: function(formType, result) {
		console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
	},
	onError: function(formType, error) {
		console.log("ERROR: We did a thing in a " + formType + " form: " + error);
	},
});

/*
	Whoops, forgot I still need this:
	Fake login, because otherwise all the Methods break
	Comment from their GitHub page: Must be accessed this way because it is a debug only package
*/
var Phony = Package['csauer:accounts-phony'].Phony;
Meteor.loginWithPhony(Phony.user);

//TODO Further test the schema validation

export default class CompanyCreateProfileForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="page CompanyCreateProfileForm">
				<Blaze template="ccp_blaze_form" />
			</div>
		);
	}
}
