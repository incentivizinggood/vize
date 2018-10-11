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
	QUESTION:
		Is it truly necessary to connect any of the custom components
		to the Formik context if this is done automatically with the
		provided Field, FieldArray, and ErrorMessage components?
*/

const withVizeFormatting = function(vfComponent, fieldname, labelgroupname) {
	// BUG errorAwareClassName is hard-coded, but needs to be
	// determined by validating the field
	const errorAwareClassName = "form-group has-error";
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

const VizeFormikInputText = ({field, form, ...props}) => withVizeFormatting(
	(fieldname, vfComponentId) => (
		<Field name={fieldname} id={vfComponentId} component={() => (
			<input type="text" className="form-control" {...field} {...props} />
		)}/>
	),
	props.name,
	props.labelgroupname
);

export const VfInputText = connect(VizeFormikInputText);
