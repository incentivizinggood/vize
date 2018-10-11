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

const withVizeFormikField = function(vfComponent, fieldname, labelgroupname) {
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
				{/* <Field name={fieldname} component={vfComponent} id={vfComponentId} /> */}
				{vfComponent(fieldname, labelgroupname)}
				<span className="help-block">
					<ErrorMessage name={fieldname} />
				</span>
			</div>
		</div>
	)
};

const VizeFormikInputText = ({field, form, ...props}) => withVizeFormikField(
	(fieldname, vfComponentId) => (
		<Field name={fieldname} id={vfComponentId} component={() => (
			<input type="text" className="form-control" {...field} {...props} />
		)}/>
	),
	props.name,
	props.labelgroupname
);

export const VfInputText = connect(VizeFormikInputText);
