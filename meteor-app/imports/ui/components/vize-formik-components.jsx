import { Meteor } from "meteor/meteor";
import React from "react";
import i18n from "meteor/universe:i18n";
import { Field, FieldArray, ErrorMessage, connect } from "formik";

/*
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

	QUESTION:
		Given the above validation requirements, what are
	my current options for validation with Formik?
	#1 Manually call SimpleSchema.validate for every field,
		and transform the results into what Formik wants
	#2 Use Yup/validationSchema for the whole thing, and
		replace SimpleSchema custom validators and other
		tricky stuff with yup.addMethod
	#3 ...a third solution would be either a piecemeal combo
		of Yup and SimpleSchema, or some from-scratch thing,
		and I don't have time for either of those.

	Pros/cons of #1 and #2? I like #2 better because it means
	removing SimpleSchema dependencies, but it does mean
	accepting the learning curve for Yup and yup.addMethod.
	#1 requires converting between SimpleSchema and Formik
	error types, which would make for some horrendous code,
	but it would be likely to work the first time.
	If we implemented #2 correctly, we could probably just
	replace the schemas in imports/api/data with Yup schemas.
	This raises a couple of interesting questions:
	QUESTION What ramifications would this have on i18n,
		and how might that code need to be refactored?
	QUESTION What other parts of the code would be affected
		by this change? We can assume that the forms won't
		mind, because they would have switched to Yup anyway,
		and GraphQL validation functions only require a very
		simple rewrite of a few lines, but I need to do some
		more homework on this.
*/

const t = i18n.createTranslator();

/*
	NOTE: next steps ->
	QUESTION:
		How do we determine errorAwareClassName? Ideally we would
		hook into Formik using fieldname rather than going directly
		to SimpleSchema, but it is possible that either solution
		might involve rethinking the architecture of this part of
		the component hierarchy so as to bring in whatever contextual
		information that is needed.
	QUESTION:
		How do we stop the form from submitting when we change the
		locale or otherwise re-render the component?
	QUESTION:
		Will the current vfComponentId scheme be viable long-term?
		If not, what would be better?
	QUESTION:
		Is it possible to remove the jsx-ally/label-has-for red
		squiggly error by actually "giving it what it wants"?
		If so, how?
	QUESTION:
		How to we make sure that these components are using Formik's
		validation context properly? For that matter, how are we going
		to set up that validation context, since it's not being done
		automagically any longer?
	QUESTION:
		How will manually-calling SimpleSchema's validators affect
		the reactivity context assumed by the custom validators?

*/

const withVizeFormatting = function(vfComponent, fieldname, labelgroupname, errors) {
	// BUG errorAwareClassName is hard-coded, but needs to be
	// determined by validating the field
	const errorAwareClassName = `form-group ${(errors !== undefined) ? "has-error" : ""}`;
	const vfComponentId = `${labelgroupname}.${fieldname}`; // BUG flesh this out later
	return (
		<div className="form-group">
			<div className={errorAwareClassName}>
				<label className="control-label" htmlFor={vfComponentId}>
					{t(`SimpleSchema.labels.${vfComponentId}`)}
				</label>
				{vfComponent(fieldname, labelgroupname)}
				<span className="help-block">
					<ErrorMessage name={fieldname} />
				</span>
			</div>
		</div>
	)
};

const VizeFormikInputText = (props) => withVizeFormatting(
	(fieldname, vfComponentId) => (
		<Field name={fieldname} id={vfComponentId} render={({field}) => (
			<div>
				<input type="text" className="form-control" {...field} {...props} />
				<div>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</div>
			</div>
		)}/>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
);

const VizeFormikInputTextArea = (props) => withVizeFormatting(
	(fieldname, vfComponentId) => (
		<Field name={fieldname} id={vfComponentId} render={({field}) => (
			<div>
				<textarea className="form-control" {...field} {...props} />
				<div>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</div>
			</div>
		)}/>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
);

// This looks like a badly-written export section,
// but it's written this way in case I want to experiment
// with using Formik's connect HOC.
export const VfInputText = connect(VizeFormikInputText);
export const VfInputTextArea = connect(VizeFormikInputTextArea);
