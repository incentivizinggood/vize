// Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "/imports/ui/components/error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var";
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

// Specific stuff second
import { JobApplicationSchema } from "/imports/api/data/jobads.js";
import "./apply-for-job.html";

const afj_form_state = new ReactiveDict();
afj_form_state.set("formError", {
	// Shared with AutoForm helpers
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});
afj_form_state.set("jobId", undefined); // Shared with the React wrapper
afj_form_state.set("job", {
	companyName: i18n.__("common.forms.pleaseWait"),
});

if (Meteor.isClient) {
	Template.afj_blaze_form.bindI18nNamespace("common.forms");

	Template.afj_blaze_form.onCreated(function() {
		const id = afj_form_state.get("jobId");
		this.autorun(function() {
			Meteor.call("jobads.findOne", id, (error, result) => {
				if (!result) {
					afj_form_state.set("job", undefined);
				} else {
					afj_form_state.set("job", result);
				}
			});
		});
	});

	Template.afj_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering afj_blaze_form");
	});

	Template.afj_blaze_form.helpers({
		jobApplicationSchema: JobApplicationSchema,
		ErrorWidget() {
			return ErrorWidget;
		},
		jobId() {
			return afj_form_state.get("jobId");
		},
		getCompanyName() {
			const job = afj_form_state.get("job");
			if (job === undefined) {
				return i18n.__("common.afj.invalidJobId");
			}
			return job.companyName;
		},
		hasError() {
			return afj_form_state.get("formError").hasError;
		},
		error() {
			return afj_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting afj_blaze_form");
			afj_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
	});

	AutoForm.addHooks("afj_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			afj_form_state.set("formError", {
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
				afj_form_state.set("formError", {
					hasError: true,
					reason: error.reason,
					error: error.error,
					details: error.details,
					isSqlError: error.error.substr(0, 8) === "SQLstate",
				});
			else
				afj_form_state.set("formError", {
					hasError: true,
					reason: "invalidFormInputs",
					error: "invalidArguments",
					details: undefined,
					isSqlError: false,
				});
		},
	});
}

export default class ApplyForJobForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		afj_form_state.set("jobId", this.props.jobId);

		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="page ApplyForJobForm">
					<Blaze template="afj_blaze_form" />
				</div>
				<Footer />
			</div>
		);
	}
}

ApplyForJobForm.propTypes = {
	jobId: PropTypes.string,
};
