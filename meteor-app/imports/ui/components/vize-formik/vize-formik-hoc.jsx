import React from "react";
import i18n from "meteor/universe:i18n";
import { Field, FieldArray, ErrorMessage, connect } from "formik";

// import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx"; // not sure if I need this yet

/*
	NOTE
	This is my highly experimental first attempt at
	refactoring the project using Formik. What I hope
	to do with the components in this file is wrap
	the per-field boilerplate into nice components
	that hook into Formik and render custom input
	components that are passed in as arguments. This is
	effectively one-half of my first-draft solution
	for "how to break the schema/UI coupling":
	Currently AutoForms uses SimpleSchema to help
	generate the HTML for input fields, looking
	at constraints, specs, and even UI controls
	(via the "autoform" field) within the SimpleSchema
	instance to determine how each field is supposed
	to look.
	But we are trying to remove AutoForms, which means
	that all the above logic that our project has
	been relying on will be *POOF* gone. So we can
	re-implement the convoluted AutoForms/SimpleSchema
	logic in React, or we can move the UI logic...
	into the UI, where it supposed to be, i.e. into
	React components, whereas it had effectively been
	tucked away in SimpleSchema...and AutoForms...
	don't think about it too much, it's weird.
	So what we do in these higher-order-components is wrap
	up the boilerplate so it doesn't have to be re-typed ad
	nauseum (styling, labels, and error messages). What are
	they wrapping? Basically, they are wrapping components
	that define custom input types, which is currently my
	best idea for refactoring/replacing AutoForm's logic
	for handling SimpleSchema's "type" field. Handling the
	rest of the SimpleSchema fields should come down to
	passing props to individual component instances.

	The current iteration of this file is mostly to help
	me visualize my problem-solving progress so far, so...

	WARNING
	Don't be fooled: I don't actually know what I'm doing.

	NOTE
	Here are the "custom types" I will need to "support":
	- star ratings
	- locations (which may used nested custom inputs *shudder*)
	- integers
	- floats
	- strings
	- booleans
	- arrays (of objects)

	NOTE
	And here are some other features that I will need to
	figure out where and how they fit in:
	- allowed values
	- ...translation of allowed values
	- company name drop-downs
	- *custom validators involving Meteor Methods*
	- optional/required fields
	- max length check for strings
	- min/max value check ("range check") for numbers
	- minimum number of words (pros/cons)
	- regex validation
	- date fields (if necessary)
	- hidden fields (if necessary)
*/

const t = i18n.createTranslator();

const doVizeFormikFieldBoilerplate = connect(
	function({ fieldName, labelGroupName, vfComponent}) {
		// BUG errorAwareClassName is hard-coded, but needs to be
		// determined by validating the field
		const errorAwareClassName = "form-group has-error";
		const vfComponentId = `${labelGroupName}.${fieldName}`; // BUG flesh this out later
		return (
			<div className="form-group">
				<div className={errorAwareClassName}>
					<label className="control-label" for={vfComponentId}>
						{t(`SimpleSchema.labels.${vfComponentId}`)}
					</label>
					<Field name={fieldName} component={vfComponent} id={vfComponentId} />
					<span className="help-block">
						<ErrorMessage name={fieldName} />
					</span>
				</div>
			</div>
		)
	}
);

const doVizeFormikArrayFieldBoilerplate = connect(
	function({ fieldName, labelGroupName, vfComponent}) {
		// BUG errorAwareClassName is hard-coded, but needs to be
		// determined by validating the field
		const errorAwareClassName = "form-group has-error";
		const vfComponentId = `${labelGroupName}.${fieldName}`; // QUESTION Will this need to be fleshed out later?
		return (
			<div className="form-group">
				<div className={errorAwareClassName}>
					<label className="control-label" for={vfComponentId}>
						{t(`SimpleSchema.labels.${vfComponentId}`)}
					</label>
					<FieldArray name={fieldName} component={vfComponent} id={vfComponentId} />
					<ErrorMessage name={fieldName} />
				</div>
			</div>
		)
	}
);

export default {
	doVizeFormikFieldBoilerplate,
	doVizeFormikArrayFieldBoilerplate
};
