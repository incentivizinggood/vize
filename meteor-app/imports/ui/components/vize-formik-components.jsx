import { Meteor } from "meteor/meteor";
import React from "react";
import i18n from "meteor/universe:i18n";
import { Field, FieldArray, ErrorMessage, connect } from "formik";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
	const vfComponentId = `${labelgroupname}.${fieldname}`; // BUG flesh this out later
	return (
		<div className="form-group">
			<div className={`form-group ${(errors !== undefined) ? "has-error" : ""}`}>
				<label className="control-label" htmlFor={vfComponentId}>
					{t(`SimpleSchema.labels.${vfComponentId}`)}
				</label>
				{vfComponent(vfComponentId)}
				<span className="help-block">
					<ErrorMessage name={fieldname}>
						{(msg) => (
							<div>
								{(typeof msg === 'string') ? msg : ""}
							</div>
						)}
					</ErrorMessage>
				</span>
			</div>
		</div>
	)
};

const VfInputText = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<input type="text" className="form-control" id={vfComponentId} {...field} {...props} />
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
));

const VfInputTextWithOptionList = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<input type="text" className="form-control" id={vfComponentId} list={`${vfComponentId}.list`} {...field} {...props} />
				<datalist id={`${vfComponentId}.list`}>
					{props.optionlist.map(
						option => <option value={option} key={`${vfComponentId}.${option}`}>{option}</option>
					)}
				</datalist>
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
));

const VfInputTextArea = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<textarea className="form-control" id={vfComponentId} {...field} {...props} />
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
));

const VfInputLocation = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<div className="panel panel-default">
			<div className="panel-body">
				<Field name={props.name} render={() => (
					<div id={vfComponentId}>
						<VfInputText name={`${props.name}.city`} labelgroupname={`${props.labelgroupname}.locationSubfields`} maxLength="300" placeholder={t("common.forms.locationCityPlaceholder")}/>
						<VfInputText name={`${props.name}.address`} labelgroupname={`${props.labelgroupname}.locationSubfields`} maxLength="300" placeholder={t("common.forms.locationAddressPlaceholder")}/>
						<VfInputText name={`${props.name}.industrialHub`} labelgroupname={`${props.labelgroupname}.locationSubfields`} maxLength="300" placeholder={t("common.forms.locationIndustrialHubPlaceholder")}/>
						{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
					</div>
				)}/>
			</div>
		</div>
	),
	props.name,
	props.labelgroupname,
	props.formik.errors[props.name]
));

const companyNameForIdQuery = gql`
	query companyNameForId($companyId: ID!) {
		company(id: $companyId) {
			name
		}
	}
`;

const allCompanyNamesQuery = gql`
	query getAllCompanyNames {
		allCompanies {
			name
		}
	}
`;

const readOnlyCompanyNameField = (props) => (
	<Query query={companyNameForIdQuery} variables={{companyId: props.companyId}}>
		{({ loading, error, data }) => {
			const companyName = () => {
				if (loading) {
					return t("common.forms.pleaseWait");
				}
				else if (error || data.company === undefined || data.company === null) {
					console.log(error);
					return t("common.forms.companyNotFound");
				}
				return data.company.name;
			}

			return (
				<VfInputText
					name="companyName"
					labelgroupname={props.labelgroupname}
					value={companyName()}
					readOnly="true"
				/>
			);
		}}
	</Query>
);

const emptyCompanyNameField = (props) => (
	<Query query={allCompanyNamesQuery} variables={{  }}>
		{({ loading, error, data }) => {
			const listOfCompanyNames = () => {
				if (loading) {
					return [t("common.forms.pleaseWait")];
				}
				else if (error || data.allCompanies === undefined || data.allCompanies === null || data.allCompanies.length === 0) {
					return [];
				}
				return data.allCompanies.map(result => result.name);
			}

			return (
				<VfInputTextWithOptionList
					name="companyName"
					labelgroupname={props.labelgroupname}
					maxLength="100"
					optionlist={listOfCompanyNames()}
					placeholder={t(`common.forms.${props.placeholdergroupname}.companyNamePlaceholder`)}
				/>
			);
		}}
	</Query>
);

export {
	VfInputText,
	VfInputTextWithOptionList,
	VfInputTextArea,
	VfInputLocation,
 	readOnlyCompanyNameField,
	emptyCompanyNameField };
