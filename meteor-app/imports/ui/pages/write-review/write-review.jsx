// Boilerplate first
import React from "react";
import { withFormik, connect, Field, ErrorMessage, Form } from "formik";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
// import ErrorWidget from "/imports/ui/error-widget.jsx"; // used to display errors thrown by methods
import Dialog from "/imports/ui/components/dialog-box";
import i18n from "meteor/universe:i18n";
import { translateError } from "/i18n/helpers.js";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { ReviewSchema } from "/imports/api/data/yup-schemas.js";

import {
	VfInputText,
	VfInputTextArea,
	VfInputLocation,
	VfInputInteger,
	VfInputRadioGroup,
	VfInputStarRating,
	readOnlyCompanyNameField,
	emptyCompanyNameField,
} from "/imports/ui/components/vize-formik-components.jsx";

const t = i18n.createTranslator();

/*
	TODO
	Fix submit-on-change-locale bug
	TODO
	Fix submission logic
	TODO
	Fix submit/reset buttons
	TODO
	Fix/implement reset logic
	TODO
	Implement submission logic with GraphQL mutation,
	replacing everything currently contained in the
	corresponding method (reviews.submitReview)
	TODO
	Re-doing the form to use Mutation seems like
	a golden opportunity to make the UI and form
	workflow more sensible and user-friendly.
	Like that thing where they don't know if the
	form submission was successful, or the form
	doesn't always clear when it needs to.
*/

const reviewFormUserInfo = gql`
	query currentUserPostgresIdWithReviews {
		currentUser {
			role
			postgresId
			reviews {
				companyName
			}
		}
	}
`;

// NOTE This is an example of what I start
// to do with variable and function names
// when I feel like I've been working on something
// for too long
const figureOutSubmittedBy = function(submittedBy) {
	if (typeof submittedBy === "function") return submittedBy();
	else if (typeof submittedBy === "object")
		return translateError(submittedBy);
	return submittedBy;
};

const WriteReviewInnerForm = props => (
	// NOTE Don't be confused by props not being
	// used in this outer query, it's used in another
	// query later (by the specific field that it's used for)
	<Query query={reviewFormUserInfo}>
		{({ loading, error, data }) => {
			// TODO These loading and error results could be
			// made A LOT nicer
			if (loading) return <h1>{t("common.forms.pleaseWait")}</h1>;
			else if (error)
				return (
					<h1>
						{typeof error === "string"
							? error
							: JSON.stringify(error)}
					</h1>
				);

			console.log(props);
			console.log(data);

			let reviewedCompanyNames;
			let userRole;
			let userPostgresId;

			if (data.currentUser) {
				reviewedCompanyNames = data.currentUser.reviews.map(
					review => review.companyName
				);
				userPostgresId = data.currentUser.postgresId;
				userRole = data.currentUser.role;
			}

			console.log(`reviewedCompanyNames === ${reviewedCompanyNames}`);
			console.log(`userRole === ${userRole}`);
			console.log(`userPostgresId === ${userPostgresId}`);

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
											<h3>
												{t("common.forms.wr.formTitle")}
											</h3>
											<br />
											<h4>
												{t("common.forms.wr.header1")}
											</h4>
										</div>
										<fieldset>
											{/*  */}
											<Field
												name="submittedBy"
												value={userPostgresId}
												component="input"
												type="number"
												hidden
												readOnly
												validate={submittedByValue => {
													console.log(
														`validating for submittedBy === ${submittedByValue}`
													);
													// BUG
													// These error-messages can be made form-specific more
													// easily now that we're outside some of Meteor's constraints
													if (!submittedByValue) {
														// add validation error for logged-out
														// common.methods.errorMessages.loggedOut
														return () =>
															t(
																"common.methods.errorMessages.loggedOut"
															);
													} else if (
														userRole.toLowerCase() !==
														"worker"
													) {
														// add validation error for permission-denied
														// common.methods.errorMessages.onlyWorkers
														return () =>
															t(
																"common.methods.errorMessages.onlyWorkers"
															);
													}
													const [
														companyName,
													] = props.values;
													if (
														companyName &&
														reviewedCompanyNames.includes(
															companyName
														)
													) {
														// add validation error for duplicate-review
														// SimpleSchema.messages.Reviews.secondReviewByUser
														return () =>
															t(
																"SimpleSchema.messages.Reviews.secondReviewByUser"
															);
													}

													return undefined;
												}}
											/>
											<div className="form-group has-error">
												<span className="help-block">
													{props.errors.submittedBy
														? figureOutSubmittedBy(
																props.errors
																	.submittedBy
														  )
														: undefined}
												</span>
											</div>
											{props.companyId !== undefined
												? readOnlyCompanyNameField({
														...props,
														formgroupname:
															"Reviews",
												  })
												: emptyCompanyNameField({
														...props,
														formgroupname:
															"Reviews",
														placeholdergroupname:
															"wr",
												  })}
											<VfInputText
												name="reviewTitle"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.reviewTitle"
												)}
												maxLength="100"
												placeholder={t(
													"common.forms.wr.reviewTitlePlaceholder"
												)}
											/>
											<VfInputLocation
												name="location"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.location"
												)}
											/>
											<VfInputText
												maxLength="100"
												name="jobTitle"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.jobTitle"
												)}
												placeholder={t(
													"common.forms.wr.jobTitlePlaceholder"
												)}
											/>
											<VfInputInteger
												min="0"
												name="numberOfMonthsWorked"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.numberOfMonthsWorked"
												)}
											/>
											<VfInputTextArea
												rows="6"
												maxLength="600"
												name="pros"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.pros"
												)}
												placeholder={t(
													"common.forms.wr.prosPlaceholder"
												)}
											/>
											<VfInputTextArea
												rows="6"
												maxLength="600"
												name="cons"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.cons"
												)}
												placeholder={t(
													"common.forms.wr.consPlaceholder"
												)}
											/>
											<VfInputRadioGroup
												optionlist={[
													{
														key: t("common.yes"),
														value: true,
													},
													{
														key: t("common.no"),
														value: false,
													},
												]}
												name="wouldRecommendToOtherJobSeekers"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.wouldRecommendToOtherJobSeekers"
												)}
											/>
											<VfInputStarRating
												style={{ float: "right" }}
												name="healthAndSafety"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.healthAndSafety"
												)}
											/>
											<VfInputStarRating
												style={{ float: "right" }}
												name="managerRelationship"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.managerRelationship"
												)}
											/>
											<VfInputStarRating
												style={{ float: "right" }}
												name="workEnvironment"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.workEnvironment"
												)}
											/>
											<VfInputStarRating
												style={{ float: "right" }}
												name="benefits"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.benefits"
												)}
											/>
											<VfInputStarRating
												style={{ float: "right" }}
												name="overallSatisfaction"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.overallSatisfaction"
												)}
											/>
											<VfInputTextArea
												rows="6"
												maxLength="6000"
												name="additionalComments"
												formgroupname="Reviews"
												labelstring={t(
													"SimpleSchema.labels.Reviews.additionalComments"
												)}
												placeholder={t(
													"common.forms.wr.additionalCommentsPlaceholder"
												)}
											/>
											<div className="form-group">
												<div className="col-lg-12">
													<div className="submit_div">
														{/* BUG These buttons need to be hooked up to functions.
															BUG Also, the buttons no longer render with proper spacing. They're fine with the original Blaze code. */}
														<button
															type="submit"
															className="btn btn-primary"
														>
															{t(
																"common.forms.submitForm"
															)}
														</button>
														<button
															type="reset"
															className="btn btn-default"
														>
															{t(
																"common.forms.resetForm"
															)}
														</button>
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
		}}
	</Query>
);

const WriteReviewForm = withFormik({
	// Initial field values can be set with mapPropsToValues
	// BUG I may want to start using this because of warnings React is giving me...
	// NOTE There's a strong chance that the only "hidden field"
	// you'll need to worry about will be submittedBy, the others
	// may be read-only, or auto-filled by the database.
	// QUESTION How will we handle "one review per company per user" errors?
	// NOTE ...nest the input field inside another GraphQL query?
	// QUESTION Even if we did that, what kind of GraphQL query would we use?
	// We could just get all the reviews for a user and check reactively
	// against the company name, but that seems like massive overkill...
	// Maybe we could handle it in the submission logic by just letting
	// the other stack layers do the work and reporting their results?
	// That's my favorite idea so far.
	// NOTE Actually, if the submission logic was handled by a GraphQL
	// Mutation, you might be able to do it reactively there. That
	// would make heaps and heaps of sense.
	// mapPropsToValues() {
	// 	return {
	// 		// submittedBy is given a dummy value here because it is required,
	// 		// but really it is always overwritten and checked server-side using
	// 		// the id of the currently-logged-in user
	// 		submittedBy: 0,
	// 	};
	// },
	validationSchema: ReviewSchema,
	handleSubmit(values, formikbag) {
		console.log("WE ARE SUBMITTING");
		return {};
	},
})(withUpdateOnChangeLocale(WriteReviewInnerForm));

export default WriteReviewForm;
