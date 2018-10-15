// Boilerplate first
// import { Meteor } from "meteor/meteor";
import React from "react";
import { withFormik, Field, Form } from "formik";
// import PropTypes from "prop-types";
import ErrorWidget from "/imports/ui/error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import Dialog from "/imports/ui/components/dialog-box";
import i18n from "meteor/universe:i18n";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { ReviewSchema } from "/imports/api/data/yup-schemas.js";

import { VfInputText, VfInputTextArea } from "/imports/ui/components/vize-formik-components.jsx";

const t = i18n.createTranslator();
const T = i18n.createComponent(t);

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

const WriteReviewInnerForm = function(props) {
	console.log(props);
	return (
		<Form>
			<div className="navbarwhite">
				<Header />
			</div>
			<section id="back_col">
				<div className="container  fom-job">
					<div className="row ">
						<div className="col-md-12 back_top_hover">
							<div className="form-container">
								{/* QUESTION Why is the class of this
								next div 'post-a-job' instead of 'write-review'? */}
								<div className="post-a-job">
									<h3>{t("common.forms.wr.formTitle")}</h3>
									<br/>
									<h4>{t("common.forms.wr.header1")}</h4>
								</div>
								<fieldset>
									{/* <div className="form-group {{#if afFieldIsInvalid name='companyName'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{#if shouldHaveCompany}}
											{{> afQuickField name='companyName' value=getCompanyName readonly=true }}
											{{else}}
											{{> afQuickField name='companyName' placeholder=(__ ".wr.companyNamePlaceholder") list="wrCompanyNames"}}
											<datalist id="wrCompanyNames">
												{{#each companyName in allCompanyNames}}
												<option value="{{companyName}}">{{companyName}}</option>
												{{/each}}
											</datalist>
											{{/if}}
										</div>
									</div> */}
									<VfInputText name="reviewTitle" labelgroupname="Reviews" maxLength="100" placeholder={t("common.forms.wr.reviewTitlePlaceholder")}/>
									{/* <div className="form-group {{#if afFieldIsInvalid name='location'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='location'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='jobTitle'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='jobTitle' placeholder=(__ ".wr.jobTitlePlaceholder")}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='numberOfMonthsWorked'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='numberOfMonthsWorked'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='pros'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='pros' className="text-area" placeholder=(__ ".wr.prosPlaceholder")}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='cons'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='cons' className="text-area" placeholder=(__ ".wr.consPlaceholder")}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='wouldRecommendToOtherJobSeekers'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField name='wouldRecommendToOtherJobSeekers'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='healthAndSafety'}}has-error{{/if}}">
										<div className="col-lg-12">
											<br>
											{{> afQuickField style="float:right" name='healthAndSafety'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='managerRelationship'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField style="float:right" name='managerRelationship'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='workEnvironment'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField style="float:right" name='workEnvironment'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='benefits'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField style="float:right" name='benefits'}}
										</div>
									</div> */}
									{/* <div className="form-group {{#if afFieldIsInvalid name='overallSatisfaction'}}has-error{{/if}}">
										<div className="col-lg-12">
											{{> afQuickField style="float:right" name='overallSatisfaction'}}
										</div>
									</div> */}
									<VfInputTextArea name="additionalComments" labelgroupname="Reviews" rows="6" maxLength="6000" placeholder={t("common.forms.wr.additionalCommentsPlaceholder")}/>
									<div className="form-group">
										<div className="col-lg-12">
											<div className="submit_div">
												{/* BUG These buttons need to be hooked up to functions.
													BUG Also, the buttons no longer render with proper spacing. They're fine with the original Blaze code. */}
												<button type="submit" className="btn btn-primary" >{t("common.forms.submitForm")}</button>
												<button type="reset" className="btn btn-default" >{t("common.forms.resetForm")}</button>
											</div>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
						<div className="clear" />
					</div>
				</div>
				<div>{JSON.stringify(props)}</div>
			</section>
			<Footer />
			<Dialog />
			{/* {{#if hasError}}
			<div>
				{{> React component=ErrorWidget err=error}}
			</div>
			{{/if}} */}
		</Form>
	);
};

const WriteReviewForm = withFormik({
	// Initial field values can be set with mapPropsToValues
	// BUG I may want to start using this because of warnings React is giving me...
	initialValues: {
		companyName: "",
		healthAndSafety: 0,
		managerRelationship: 0,
		workEnvironment: 0,
		benefits: 0,
		overallSatisfaction: 0,
	},
	validationSchema: ReviewSchema,
	handleSubmit(values, formikbag) {
		console.log("WE ARE SUBMITTING");
		return {};
	},
})(withUpdateOnChangeLocale(WriteReviewInnerForm));

export default WriteReviewForm;

// export default class WriteReviewForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	render() {
// 		wr_form_state.set("companyId", this.props.companyId);
//
// 		return (
// 			<div>
				// <div className="navbarwhite">
				// 	<Header />
				// </div>
// 				{/* <div className="page WriteReviewForm">
// 					<Blaze template="wr_blaze_form" />
// 				</div> */}
				// <Footer />
				// <Dialog />
// 			</div>
// 		);
// 	}
// }
//
// WriteReviewForm.propTypes = {
// 	companyId: PropTypes.string,
// }
//
// if (Meteor.isClient) {
// 	Template.wr_blaze_form.bindI18nNamespace("common.forms");
//
// 	Template.wr_blaze_form.onCreated(function() {
// 		const id = wr_form_state.get("companyId");
// 		if (id !== undefined) {
// 			// no need to go to all that trouble if we're on the home page
// 			this.autorun(function() {
// 				Meteor.call("companies.findOne", id, (error, result) => {
// 					if (!result) {
// 						wr_form_state.set("company", undefined);
// 					} else {
// 						wr_form_state.set("company", result);
// 					}
// 				});
// 			});
// 		} else {
// 			// else be ready to offer suggestions as the user fills in the name
// 			Meteor.call("companies.getAllCompanyNames", (error, result) => {
// 				if (!result) {
// 					wr_form_state.set("allCompanyNames", []);
// 				} else {
// 					wr_form_state.set("allCompanyNames", result);
// 				}
// 			});
// 		}
// 	});
//
// 	Template.wr_blaze_form.onRendered(function() {
// 		if (Meteor.isDevelopment) console.log("Rendering wr_blaze_form");
// 	});
//
// 	Template.wr_blaze_form.helpers({
// 		reviewSchema: ReviewSchema,
// 		ErrorWidget() {
// 			return ErrorWidget;
// 		},
// 		shouldHaveCompany() {
// 			return wr_form_state.get("companyId") !== undefined;
// 		},
// 		getCompanyName() {
// 			const company = wr_form_state.get("company");
// 			if (company === undefined) {
// 				return i18n.__("common.forms.companyNotFound");
// 			}
// 			return company.name;
// 		},
// 		allCompanyNames() {
// 			return wr_form_state.get("allCompanyNames");
// 		},
// 		hasError() {
// 			return wr_form_state.get("formError").hasError;
// 		},
// 		error() {
// 			return wr_form_state.get("formError");
// 		},
// 		resetFormError() {
// 			// called when reset button is clicked
// 			if (Meteor.isDevelopment) console.log("Resetting wr_review_form");
// 			wr_form_state.set("formError", {
// 				hasError: false,
// 				isSqlError: false,
// 			});
// 		},
// 	});
//
// 	AutoForm.addHooks("wr_blaze_form", {
// 		onSuccess(formType, result) {
// 			// If your method returns something, it will show up in "result"
// 			if (Meteor.isDevelopment)
// 				console.log(
// 					`SUCCESS: We did a thing in a ${formType} form: ${result}`
// 				);
// 			wr_form_state.set("formError", {
// 				hasError: false,
// 				isSqlError: false,
// 			});
// 		},
// 		onError(formType, error) {
// 			// "error" contains whatever error object was thrown
// 			if (Meteor.isDevelopment) {
// 				console.log(
// 					`ERROR: We did a thing in a ${formType} form: ${error}`
// 				);
// 				console.log("VALIDATION CONTEXT:");
// 				console.log(this.validationContext);
// 			}
// 			if (error instanceof Meteor.Error)
// 				wr_form_state.set("formError", {
// 					hasError: true,
// 					reason: error.reason,
// 					error: error.error,
// 					details: error.details,
// 					isSqlError: error.error.substr(0, 8) === "SQLstate",
// 				});
// 			else
// 				wr_form_state.set("formError", {
// 					hasError: true,
// 					reason: "invalidFormInputs",
// 					error: "invalidArguments",
// 					details: undefined,
// 					isSqlError: false,
// 				});
// 		},
// 	});
// }
//
// export default class WriteReviewForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	render() {
// 		wr_form_state.set("companyId", this.props.companyId);
//
// 		return (
// 			<div>
// 				<div className="navbarwhite">
// 					<Header />
// 				</div>
// 				<div className="page WriteReviewForm">
// 					<Blaze template="wr_blaze_form" />
// 				</div>
// 				<Footer />
// 				<Dialog />
// 			</div>
// 		);
// 	}
// }
//
// WriteReviewForm.propTypes = {
// 	companyId: PropTypes.string,
// };
