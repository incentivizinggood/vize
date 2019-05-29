// Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "/imports/ui/components/error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";

import i18n from "meteor/universe:i18n";

// Specific stuff second
import { SalarySchema } from "/imports/api/data/salaries.js";
import "./submit-salary-data.html";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import PageWrapper from "/imports/ui/components/page-wrapper";

import ModalView from "/imports/ui/components/modals/modal-view.jsx";
import RegisterLoginModal from "../../components/register-login-modal.jsx";

import "/imports/ui/components/afInputLocation";

const T = i18n.createComponent();

const ssd_form_state = new ReactiveDict();
ssd_form_state.set("formError", {
	// Shared with AutoForm helpers
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});
ssd_form_state.set("companyId", undefined); // Shared with the React wrapper
ssd_form_state.set("company", {
	name: i18n.__("common.forms.pleaseWait"),
});
ssd_form_state.set("allCompanyNames", []);

// This is my technique for reactively translating
// drop-down options. I did the same thing in post-a-job.jsx
// for contract type options, the comments there give
// the general idea of what I'm doing here for gender
// and income type options.
ssd_form_state.set("incomeTypeOptions", [
	{
		label: i18n.__("common.forms.ssd.payTypes.yearlySalary"),
		value: "Yearly Salary",
	},
	{
		label: i18n.__("common.forms.ssd.payTypes.monthlySalary"),
		value: "Monthly Salary",
	},
	{
		label: i18n.__("common.forms.ssd.payTypes.hourlyWage"),
		value: "Hourly Wage",
	},
]);
ssd_form_state.set("genderOptions", [
	{ label: i18n.__("common.gender.male"), value: "Male" },
	{
		label: i18n.__("common.gender.female"),
		value: "Female",
	},
]);

if (Meteor.isClient) {
	import { reactiveCommonTranslator } from "/imports/ui/startup/i18n.js";

	Template.ssd_blaze_form.bindI18nNamespace("common.forms");

	Template.ssd_blaze_form.onCreated(function() {
		const id = ssd_form_state.get("companyId");
		if (Meteor.isDevelopment) console.log(`received id: ${id}`);
		this.autorun(function() {
			ssd_form_state.set("incomeTypeOptions", [
				{
					label: reactiveCommonTranslator(
						"forms.ssd.payTypes.yearlySalary"
					),
					value: "Yearly Salary",
				},
				{
					label: reactiveCommonTranslator(
						"forms.ssd.payTypes.monthlySalary"
					),
					value: "Monthly Salary",
				},
				{
					label: reactiveCommonTranslator(
						"forms.ssd.payTypes.hourlyWage"
					),
					value: "Hourly Wage",
				},
			]);
			ssd_form_state.set("genderOptions", [
				{
					label: reactiveCommonTranslator("gender.male"),
					value: "Male",
				},
				{
					label: reactiveCommonTranslator("gender.female"),
					value: "Female",
				},
			]);
		});
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
		} else {
			// else be ready to offer suggestions as the user fills in the name
			Meteor.call("companies.getAllCompanyNames", (error, result) => {
				if (!result) {
					ssd_form_state.set("allCompanyNames", []);
				} else {
					ssd_form_state.set("allCompanyNames", result);
				}
			});
		}
	});

	Template.ssd_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering ssd_blaze_form");
	});

	Template.ssd_blaze_form.helpers({
		salarySchema: SalarySchema,
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
		allCompanyNames() {
			return ssd_form_state.get("allCompanyNames");
		},
		getIncomeTypeOptions() {
			return ssd_form_state.get("incomeTypeOptions");
		},
		getGenderOptions() {
			return ssd_form_state.get("genderOptions");
		},
		hasError() {
			return ssd_form_state.get("formError").hasError;
		},
		error() {
			return ssd_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting ssd_review_form");
			ssd_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
	});

	AutoForm.addHooks("ssd_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			ssd_form_state.set("formError", {
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
				ssd_form_state.set("formError", {
					hasError: true,
					reason: error.reason,
					error: error.error,
					details: error.details,
					isSqlError: error.error.substr(0, 8) === "SQLstate",
				});
			else
				ssd_form_state.set("formError", {
					hasError: true,
					reason: "invalidFormInputs",
					error: "invalidArguments",
					details: undefined,
					isSqlError: false,
				});
		},
	});
}

class SubmitSalaryDataForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		ssd_form_state.set("companyId", this.props.companyId);

		let content = null;
		if (this.props.user) {
			content = null;
		} else {
			content = (
				<ModalView
					className="flag-style-btn"
					noButton
					content={RegisterLoginModal}
				>
					<T>common.companyreview.report</T>
				</ModalView>
			);
		}

		return (
			<PageWrapper title="Salary">
				<div className="page SubmitSalaryDataForm">
					<Blaze template="ssd_blaze_form" />
					{content}
				</div>
			</PageWrapper>
		);
	}
}

SubmitSalaryDataForm.propTypes = {
	companyId: PropTypes.string,
};

export default withRouter(
	withTracker(() => ({
		user: Meteor.user(),
	}))(SubmitSalaryDataForm)
);
