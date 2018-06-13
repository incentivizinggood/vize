// Boilerplate first
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";

// Specific stuff second
import { Salaries } from "../../api/data/salaries.js";
import { Companies } from "../../api/data/companies.js";
import "/imports/ui/forms/submit-salary-data.html";

const ssd_form_state = new ReactiveDict();
ssd_form_state.set("formError", "good"); // Shared with AutoForm helpers
ssd_form_state.set("companyId", undefined); // Shared with the React wrapper
ssd_form_state.set("company", {
	name: i18n.__("common.forms.pleaseWait"),
});

if (Meteor.isClient) {
	Template.ssd_blaze_form.bindI18nNamespace("common.forms");

	Template.ssd_blaze_form.onCreated(function() {
		const id = ssd_form_state.get("companyId");
		if (Meteor.isDevelopment) console.log(`received id: ${id}`);
		if (id !== undefined) {
			this.autorun(function() {
				Meteor.call("companies.findOne", id, (error, result) => {
					if (!result) {
						ssd_form_state.set("company", undefined);
					} else {
						ssd_form_state.set("company", result);
					}
				});
			});
		}
	});

	Template.ssd_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering ssd_blaze_form");
	});

	Template.ssd_blaze_form.helpers({
		salaries: Salaries,
		ErrorWidget() {
			return ErrorWidget;
		},
		shouldHaveCompany() {
			return ssd_form_state.get("companyId") !== undefined;
		},
		getCompanyName() {
			const company = ssd_form_state.get("company");
			if (company === undefined) {
				return i18n.__("common.forms.companyNotFound");
			}
			return company.name;
		},
		hasError() {
			return ssd_form_state.get("formError") !== "good";
		},
		error() {
			return ssd_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting ssd_review_form");
			ssd_form_state.set("formError", "good");
		},
	});

	AutoForm.addHooks("ssd_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			ssd_form_state.set("formError", "good");
		},
		onError(formType, error) {
			// "error" contains whatever error object was thrown
			if (Meteor.isDevelopment)
				console.log(
					`ERROR: We did a thing in a ${formType} form: ${error}`
				);
			ssd_form_state.set("formError", error.toString());
		},
	});
}

export default class SubmitSalaryDataForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		ssd_form_state.set("companyId", this.props.companyId);

		return (
			<div className="page SubmitSalaryDataForm">
				<Blaze template="ssd_blaze_form" />
			</div>
		);
	}
}

SubmitSalaryDataForm.propTypes = {
	companyId: PropTypes.string,
};
