// Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";

// Specific stuff second
import { JobAds } from "../../api/data/jobads.js";
import { Companies } from "../../api/data/companies.js";
import "/imports/ui/forms/post-a-job.html";

import Header from "/imports/ui/components/header.jsx";
import Footer from "/imports/ui/components/footer.jsx";

import "../afInputLocation.html";
import "../afInputLocation.js";

const paj_form_state = new ReactiveDict();
paj_form_state.set("formError", {
	// Shared with AutoForm helpers
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});
paj_form_state.set("companyId", undefined); // Shared with the React wrapper
paj_form_state.set("company", {
	name: i18n.__("common.forms.pleaseWait"),
});

if (Meteor.isClient) {
	Template.paj_blaze_form.bindI18nNamespace("common.forms");

	Template.paj_blaze_form.onCreated(function() {
		this.autorun(function() {
			Meteor.call("companies.companyForCurrentUser", (error, result) => {
				if (!result) {
					paj_form_state.set("company", undefined);
				} else {
					paj_form_state.set("company", result);
				}
			});
		});
	});

	Template.paj_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering paj_blaze_form");
	});

	Template.paj_blaze_form.helpers({
		jobAds: JobAds,
		ErrorWidget() {
			return ErrorWidget;
		},
		getCompanyName() {
			const company = paj_form_state.get("company");
			if (company === undefined) {
				return i18n.__("common.forms.paj.profileNotFoundError");
			}
			return company.name;
		},
		getContractTypeOptions() {
			return [
				{
					label: i18n.__("common.forms.paj.contractTypes.fullTime"),
					value: "Full time",
				},
				{
					label: i18n.__("common.forms.paj.contractTypes.partTime"),
					value: "Part time",
				},
				{
					label: i18n.__("common.forms.paj.contractTypes.contractor"),
					value: "Contractor",
				},
			];
		},
		hasError() {
			return paj_form_state.get("formError").hasError;
		},
		error() {
			return paj_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			paj_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
	});

	AutoForm.addHooks("paj_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			paj_form_state.set("formError", {
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
				paj_form_state.set("formError", {
					hasError: true,
					reason: error.reason,
					error: error.error,
					details: error.details,
					isSqlError: error.error.substr(0, 8) === "SQLstate",
				});
			else
				paj_form_state.set("formError", {
					hasError: true,
					reason: "invalidFormInputs",
					error: "invalidArguments",
					details: undefined,
					isSqlError: false,
				});
		},
	});
}

export default class PostAJobForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="page PostAJobForm">
					<Blaze template="paj_blaze_form" />
				</div>
				<Footer />
			</div>
		);
	}
}
