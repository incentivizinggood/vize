import React from "react";

import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import * as Blaze from "meteor/gadicc:blaze-react-component";
import { ReactiveDict } from "meteor/reactive-dict";
import { AutoForm } from "meteor/aldeed:autoform";

import { CompanySchema } from "imports/api/data/companies";
import ErrorWidget from "imports/ui/components/error-widget";
import PageWrapper from "imports/ui/components/page-wrapper";
import "imports/ui/components/afInputLocation";

import "./create-company-profile.html";

const ccp_form_state = new ReactiveDict();
ccp_form_state.set("formError", {
	// Shared with AutoForm helpers
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});

if (Meteor.isClient) {
	Template.ccp_blaze_form.bindI18nNamespace("common.forms");

	Template.ccp_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering ccp_blaze_form");
	});

	Template.ccp_blaze_form.helpers({
		companySchema: CompanySchema,
		ErrorWidget() {
			/*
			This is a good place to talk about the little error blurb
			you see at the bottom of this form. I realize that it's
			redundant with most of AutoForm's auto-validation.
			However, it offers many advantages:
			1) It reflects the *method* errors, not auto-validation errors
			2) It therefore catches some things, like not-logged-in, that
				auto-validation can't/shouldn't
			3) It may be helpful to see errors in two places, especially
				if one place is fixed at the bottom of the form
			4) It is immensely useful in testing, because it tends to reflect state
		*/
			return ErrorWidget;
		},
		hasError() {
			return ccp_form_state.get("formError").hasError;
		},
		error() {
			return ccp_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting ccp_blaze_form");
			ccp_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
	});

	AutoForm.addHooks("ccp_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			ccp_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
		onError(formType, error) {
			// "error" contains whatever error object was thrown
			if (Meteor.isDevelopment)
				console.log(
					`ERROR: We did a thing in a ${formType} form: ${error}`
				);
			if (error instanceof Meteor.Error)
				ccp_form_state.set("formError", {
					hasError: true,
					reason: error.reason,
					error: error.error,
					details: error.details,
					isSqlError: error.error.substr(0, 8) === "SQLstate",
				});
			else
				ccp_form_state.set("formError", {
					hasError: true,
					reason: "invalidFormInputs",
					error: "invalidArguments",
					details: undefined,
					isSqlError: false,
				});
		},
	});
}

export default class CompanyCreateProfileForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageWrapper title="Create Company Profile">
				<div className="page CompanyCreateProfileForm">
					<Blaze.default.default template="ccp_blaze_form" />
				</div>
			</PageWrapper>
		);
	}
}