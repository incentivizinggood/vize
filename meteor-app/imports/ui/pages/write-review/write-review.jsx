// Boilerplate first
// import { Meteor } from "meteor/meteor";
import React from "react";
import { withFormik, Form } from "formik";
// import PropTypes from "prop-types";
// import ErrorWidget from "/imports/ui/error-widget.jsx"; // used to display errors thrown by methods
// import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import Dialog from "/imports/ui/components/dialog-box";
import i18n from "meteor/universe:i18n";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { ReviewSchema } from "/imports/api/data/yup-schemas.js";

import {
	VfInputText,
	VfInputTextArea,
	VfInputLocation,
	VfInputInteger,
	VfInputStarRating,
	readOnlyCompanyNameField,
	emptyCompanyNameField } from "/imports/ui/components/vize-formik-components.jsx";

const t = i18n.createTranslator();
// const T = i18n.createComponent(t);

// const wr_form_state = new ReactiveDict();
// wr_form_state.set("formError", {
// 	// Shared with AutoForm helpers
// 	hasError: false,
// 	reason: undefined,
// 	error: undefined,
// 	details: undefined,
// 	isSqlError: false,
// });
// wr_form_state.set("companyId", undefined); // Shared with the React wrapper
// wr_form_state.set("company", {
// 	name: t("common.forms.pleaseWait"),
// });
// wr_form_state.set("allCompanyNames", []);

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
									{
										(props.companyId !== undefined) ?
											readOnlyCompanyNameField({
												...props,
												formgroupname: "Reviews",
											}) :
											emptyCompanyNameField({
												...props,
												formgroupname: "Reviews",
												placeholdergroupname: "wr"
											})
									}
									<VfInputText name="reviewTitle" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.reviewTitle")} maxLength="100" placeholder={t("common.forms.wr.reviewTitlePlaceholder")}/>
									<VfInputLocation name="location" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.location")}/>
									<VfInputText name="jobTitle" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.jobTitle")} maxLength="100" placeholder={t("common.forms.wr.jobTitlePlaceholder")}/>
									<VfInputInteger name="numberOfMonthsWorked" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.numberOfMonthsWorked")} min="0"/>
									<VfInputTextArea name="pros" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.pros")} rows="6" maxLength="600" placeholder={t("common.forms.wr.prosPlaceholder")}/>
									<VfInputTextArea name="cons" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.cons")} rows="6" maxLength="600" placeholder={t("common.forms.wr.consPlaceholder")}/>
									{/*
										<div className="form-group {{#if afFieldIsInvalid name='wouldRecommendToOtherJobSeekers'}}has-error{{/if}}">
											<div className="col-lg-12">
												{{> afQuickField name='wouldRecommendToOtherJobSeekers'}}
											</div>
										</div>
									*/}

									<VfInputStarRating name="healthAndSafety" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.healthAndSafety")} style={{"float":"right"}}/>
									<VfInputStarRating name="managerRelationship" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.managerRelationship")} style={{"float":"right"}}/>
									<VfInputStarRating name="workEnvironment" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.workEnvironment")} style={{"float":"right"}}/>
									<VfInputStarRating name="benefits" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.benefits")} style={{"float":"right"}}/>
									<VfInputStarRating name="overallSatisfaction" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.overallSatisfaction")} style={{"float":"right"}}/>
									<VfInputTextArea name="additionalComments" formgroupname="Reviews" labelstring={t("SimpleSchema.labels.Reviews.additionalComments")} rows="6" maxLength="6000" placeholder={t("common.forms.wr.additionalCommentsPlaceholder")}/>
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
				{/* <div>{JSON.stringify(props)}</div> */}
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
