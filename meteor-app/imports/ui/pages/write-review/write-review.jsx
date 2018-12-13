// Boilerplate first
import React from "react";
import { withFormik, connect, ErrorMessage, Formik, Form } from "formik";
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

import ReviewFormQuery from "./write-review.graphql";

/*
	NOTE
	Formik is hooking up the reset button automatically,
	and it seems to be working just fine. Preliminary tests
	are all clear, so not going to fix it until it breaks...
	NOTE
	The usage and logic surrounding the submitButtonClicked
	variable is meant to prevent undesired form submissions
	caused by externally-triggered re-renders, such as from
	withUpdateOnChangeLocale. I make no guarantees as to the
	robustness of this solution, only that it seems to fix
	most of the symptoms I was seeing.
	TODO/BUG
	Go through code and docs and make sure that double-submits
	and other invalid states are properly prevented/preempted.
	TODO
	Refactor GraphQL queries into .graphql files
	TODO
	Refactor readOnlyCompanyNameField and emptyCompanyNameField
	to...not exist. Move the GraphQL queries into the components
	in this file, and just add the proper logic. No reason to have
	more components (or more GraphQL Queries...) than we need.
	Well...this is a bit more difficult than it sounds.
	We can move the other Queries into this file and avoid
	extraneous components, and we can move the query definitions
	into .graphql files, but I'm not sure if it's possible or
	desirable to combine all the queries.
	NOTE
	They're not actually extraneous, they get re-used on
	the salaries form.
	TODO
	Fix submission logic
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
	BUG
	I'm convinced that some of my connect calls
	can be refactored out, I'm just not sure how
	and I'm not going to try to figure it out because...
	it works, and I have more important things to do.
*/

// NOTE used to "filter events" and prevent
// undesired form submissions, such as one
// that occur due to locale changes causing
// withUpdateOnChangeLocale to force a re-render...
let submitButtonClicked = false;

// NOTE variables used while parsing Query results
let reviewedCompanyNames;
let userRole;
let userPostgresId;

// Everyone's favorite...
const t = i18n.createTranslator();

// NOTE
// HEY, check out this cool thing I found
// on Stack Overflow, I'm using it inside
// Formik's validate function to simplify
// figuring out how to construct the results:
// https://stackoverflow.com/questions/5072136/javascript-filter-for-objects

const filterObjectKeys = (obj, predicate) => {
	let result = {},
		key;

	for (key of Object.keys(obj)) {
		if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
			result[key] = obj[key];
		}
	}

	return result;
};

// NOTE This is an example of what I start
// to do with variable and function names
// when I feel like I've been working on something
// for too long
const figureOutSubmittedBy = submittedBy => {
	if (typeof submittedBy === "function") return submittedBy();
	else if (typeof submittedBy === "object")
		return translateError(submittedBy);
	return submittedBy;
};

const getCustomErrorsForSubmittedBy = (submittedByValue, companyName) => {
	// console.log(`validating for submittedBy === ${submittedByValue}`);
	// TODO/REFACTOR?
	// These error-messages can be made form-specific more
	// easily now that we're outside some of Meteor's constraints
	if (!submittedByValue) {
		// add validation error for logged-out
		// common.methods.errorMessages.loggedOut
		return () => t("common.methods.errorMessages.loggedOut");
	} else if (userRole.toLowerCase() !== "worker") {
		// add validation error for permission-denied
		// common.methods.errorMessages.onlyWorkers
		return () => t("common.methods.errorMessages.onlyWorkers");
	}

	if (companyName && reviewedCompanyNames.includes(companyName)) {
		// add validation error for duplicate-review
		// SimpleSchema.messages.Reviews.secondReviewByUser
		return () => t("SimpleSchema.messages.Reviews.secondReviewByUser");
	}

	return undefined;
};

const WriteReviewInnerForm = connect(props => {
	console.log("WriteReviewInnerForm: ");
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
									<br />
									<h4>{t("common.forms.wr.header1")}</h4>
								</div>
								<fieldset>
									<div className="form-group has-error">
										<span className="help-block">
											{props.formik.errors.submittedBy
												? figureOutSubmittedBy(
														props.formik.errors
															.submittedBy
												  )
												: undefined}
										</span>
									</div>
									{props.companyId !== undefined
										? readOnlyCompanyNameField({
												...props,
												formgroupname: "Reviews",
										  })
										: emptyCompanyNameField({
												...props,
												formgroupname: "Reviews",
												placeholdergroupname: "wr",
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
													onClick={() => {
														submitButtonClicked = true;
													}}
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
});

const WriteReviewOuterForm = props => {
	// BUG
	// GraphQL caches the results of this query
	// incorrectly, so that if a user logs out
	// and comes back to this form without refreshing,
	// it will re-use the old query results. The
	// same thing happens if they log in as another
	// user, even if that user is a company.
	// I'm working around it by setting the fetchPolicy
	// to network-only, but...
	// BUG
	// The query results are not updated when the user
	// logs out. I'm not sure if the best way to fix this
	// is to fix the login button, or to do something different
	// with the query. Gonna leave it alone for now.
	const companyIdArg =
		props.companyId !== undefined && props.companyId !== null
			? props.companyId
			: "";
	return (
		<Query
			query={ReviewFormQuery}
			variables={{ companyId: companyIdArg }}
			fetchPolicy="network-only"
		>
			{({ loading, error, data }) => {
				// TODO These loading and error results could be
				// made A LOT nicer
				console.log(data);
				console.log(error);
				if (loading) return <h1>{t("common.forms.pleaseWait")}</h1>;
				else if (error)
					return (
						<h1>
							{typeof error === "string"
								? error
								: JSON.stringify(error)}
						</h1>
					);

				if (data.userInfo) {
					reviewedCompanyNames = data.userInfo.reviews.map(
						review => review.company.name
					);
					userPostgresId = data.userInfo.postgresId;
					userRole = data.userInfo.role;
				}

				console.log(data);
				console.log(`reviewedCompanyNames === ${reviewedCompanyNames}`);
				console.log(`userRole === ${userRole}`);
				console.log(`userPostgresId === ${userPostgresId}`);

				// console.log("WriteReviewOuterForm: ")
				// console.log(props);

				return (
					<Formik
						initialValues={{ submittedBy: userPostgresId }}
						validationSchema={ReviewSchema}
						validate={values => {
							let errors = {};
							const { submittedBy, companyName } = values;
							errors.submittedBy = getCustomErrorsForSubmittedBy(
								submittedBy,
								companyName
							);
							return filterObjectKeys(
								errors,
								thing => thing === undefined || thing === null
							);
						}}
						// validateOnChange={false}
						// validateOnBlur={false}
						onSubmit={(values, actions) => {
							// submitButtonClicked usage helps us prevent
							// extraneous submissions, such as those caused
							// by re-renders from withUpdateOnChangeLocale
							if (!submitButtonClicked) return;
							submitButtonClicked = false;

							console.log("WE ARE SUBMITTING");
							console.log(values);
							console.log(actions);
						}}
						// This feels like such a disgusting hack,
						// what has my life become...
						component={() => WriteReviewInnerForm(props)}
					/>
				);
			}}
		</Query>
	);
};

const WriteReviewForm = withUpdateOnChangeLocale(WriteReviewOuterForm);

export default WriteReviewForm;
