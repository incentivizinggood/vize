// Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";

// Specific stuff second
import { Reviews } from "../../api/data/reviews.js";
import { Companies } from "../../api/data/companies.js";
import "/imports/ui/forms/write-review.html";

import Header from "/imports/ui/components/header.jsx";
import Footer from "/imports/ui/components/footer.jsx";

// Weird that I have to import both of these here,
// rather than import the .html in the .js and just
// import the .js here, but Meteor complains if I don't,
// so whatever...
import "../afInputStarRating.html";
import "../afInputStarRating.js";

const wr_form_state = new ReactiveDict();
wr_form_state.set("formError", {
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});

// Shared with AutoForm helpers
wr_form_state.set("companyId", undefined); // Shared with the React wrapper
wr_form_state.set("company", {
	name: i18n.__("common.forms.pleaseWait"),
});

if (Meteor.isClient) {
	Template.wr_blaze_form.bindI18nNamespace("common.forms");

	Template.wr_blaze_form.onCreated(function() {
		const id = wr_form_state.get("companyId");
		if (id !== undefined) {
			// no need to go to all that trouble if we're on the home page
			this.autorun(function() {
				Meteor.call("companies.findOne", id, (error, result) => {
					if (!result) {
						wr_form_state.set("company", undefined);
					} else {
						wr_form_state.set("company", result);
					}
				});
			});
		}
	});

	Template.wr_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering wr_blaze_form");
	});

	Template.wr_blaze_form.helpers({
		reviews: Reviews,
		ErrorWidget() {
			return ErrorWidget;
		},
		shouldHaveCompany() {
			return wr_form_state.get("companyId") !== undefined;
		},
		getCompanyName() {
			const company = wr_form_state.get("company");
			if (company === undefined) {
				return i18n.__("common.forms.companyNotFound");
			}
			return company.name;
		},
		hasError() {
			return wr_form_state.get("formError").hasError;
		},
		error() {
			return wr_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting wr_review_form");
			wr_form_state.set("formError", {
				hasError: false,
				isSqlError: false,
			});
		},
	});

	AutoForm.addHooks("wr_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			wr_form_state.set("formError", {
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
				wr_form_state.set("formError", {
					hasError: true,
					reason: error.reason,
					error: error.error,
					details: error.details,
					isSqlError: error.error.substr(0, 8) === "SQLstate",
				});
			else
				wr_form_state.set("formError", {
					hasError: true,
					reason: "invalidFormInputs",
					error: "invalidArguments",
					details: undefined,
					isSqlError: false,
				});
		},
	});
}

export default class WriteReviewForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		wr_form_state.set("companyId", this.props.companyId);

		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="page WriteReviewForm">
					<Blaze template="wr_blaze_form" />
				</div>
				<Footer />
			</div>
		);
	}
}

WriteReviewForm.propTypes = {
	companyId: PropTypes.string,
};
