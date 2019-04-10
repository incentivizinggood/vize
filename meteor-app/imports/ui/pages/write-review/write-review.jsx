// Boilerplate first
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "/imports/ui/components/error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import ModalView from "/imports/ui/components/modals/modal-view.jsx";
import RegisterLoginModal from "../../components/register-login-modal.jsx";

import i18n from "meteor/universe:i18n";

// Specific stuff second
import { ReviewSchema } from "/imports/api/data/reviews.js";
import "./write-review.html";

import PageWrapper from "/imports/ui/components/page-wrapper";

// Weird that I have to import all of these here,
// rather than import the .html in the .js and just
// import the .js here, but Meteor complains if I don't,
// so whatever...
import "/imports/ui/components/afInputStarRating";
import "/imports/ui/components/afInputLocation";

const T = i18n.createComponent();

let historyProps = null;

const wr_form_state = new ReactiveDict();
wr_form_state.set("formError", {
	// Shared with AutoForm helpers
	hasError: false,
	reason: undefined,
	error: undefined,
	details: undefined,
	isSqlError: false,
});
wr_form_state.set("companyId", undefined); // Shared with the React wrapper
wr_form_state.set("company", {
	name: i18n.__("common.forms.pleaseWait"),
});
wr_form_state.set("allCompanyNames", []);

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
		} else {
			// else be ready to offer suggestions as the user fills in the name
			Meteor.call("companies.getAllCompanyNames", (error, result) => {
				if (!result) {
					wr_form_state.set("allCompanyNames", []);
				} else {
					wr_form_state.set("allCompanyNames", result);
				}
			});
		}
	});

	Template.wr_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering wr_blaze_form");
	});

	Template.wr_blaze_form.helpers({
		reviewSchema: ReviewSchema,
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
		allCompanyNames() {
			return wr_form_state.get("allCompanyNames");
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

			if (historyProps != null) {
				historyProps.push("/review-submitted");

				// reloading the page after navigation so that rewardstatus is updated
				// correctly. This is a quick fix and if reward status can be updated
				// without having to do a page refresh, that would be better.
				window.location.reload();
			}
		},
		onError(formType, error) {
			// "error" contains whatever error object was thrown
			if (Meteor.isDevelopment) {
				console.log(
					`ERROR: We did a thing in a ${formType} form: ${error}`
				);
				console.log("VALIDATION CONTEXT:");
				console.log(this.validationContext);
			}

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

class WriteReviewForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		wr_form_state.set("companyId", this.props.companyId);
		historyProps = this.props.history;

		let content = null;
		console.log(Meteor.user());
		if (Meteor.user()) {
			content = null;
		} else {
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
					<br />
					<h3>You must be logged in to use this page. </h3>
					<br />
					<Link className="btn btn-primary" to="/login">
						Log In
					</Link>
					<br />
				</div>
			);
		}

		return (
			<PageWrapper>
				<div className="page WriteReviewForm">
					<Blaze template="wr_blaze_form" />
					<ModalView
						className="flag-style-btn"
						noButton
						content={RegisterLoginModal}
					>
						<T>common.companyreview.report</T>
					</ModalView>
				</div>
			</PageWrapper>
		);
	}
}

WriteReviewForm.propTypes = {
	companyId: PropTypes.string,
};

export default withRouter(WriteReviewForm);
