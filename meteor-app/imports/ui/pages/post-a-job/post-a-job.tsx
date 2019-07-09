import React from "react";

import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import * as Blaze from "meteor/gadicc:blaze-react-component";
import { ReactiveDict } from "meteor/reactive-dict";
import { AutoForm } from "meteor/aldeed:autoform";
import { i18n } from "meteor/universe:i18n";

import { reactiveCommonTranslator } from "imports/ui/startup/i18n";
import { JobAdSchema } from "imports/api/data/jobads";
import ErrorWidget from "imports/ui/components/error-widget";
import PageWrapper from "imports/ui/components/page-wrapper";
import "imports/ui/components/afInputLocation";

import "./post-a-job.html";

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

// This holds the options that show up in the
// contract type drop-down, in a reactive global
// object so that they can be translated reactively
// by a reactive translator which will be invoked
// in the template's onCreated function. We give them
// correct initial values here, but know that they
// will be reactively clobbered and are fine with that.
// Can you tell I hate Meteor? :) Maybe I just can't
// read docs, but I get the impression that this
// should have been much simpler...
paj_form_state.set("contractTypeOptions", [
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
]);

if (Meteor.isClient) {
	Template.paj_blaze_form.bindI18nNamespace("common.forms");

	Template.paj_blaze_form.onCreated(function() {
		this.autorun(function() {
			paj_form_state.set("contractTypeOptions", [
				{
					label: reactiveCommonTranslator(
						"forms.paj.contractTypes.fullTime"
					),
					value: "Full time",
				},
				{
					label: reactiveCommonTranslator(
						"forms.paj.contractTypes.partTime"
					),
					value: "Part time",
				},
				{
					label: reactiveCommonTranslator(
						"forms.paj.contractTypes.contractor"
					),
					value: "Contractor",
				},
			]);
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
		jobAdSchema: JobAdSchema,
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
			return paj_form_state.get("contractTypeOptions");
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
			<PageWrapper title="Post a Job">
				<div className="page PostAJobForm">
					<Blaze.default.default template="paj_blaze_form" />
				</div>
			</PageWrapper>
		);
	}
}
