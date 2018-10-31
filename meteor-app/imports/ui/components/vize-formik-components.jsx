import { Meteor } from "meteor/meteor";
import React from "react";
import i18n from "meteor/universe:i18n";
import { Field, FieldArray, ErrorMessage, connect } from "formik";
import StarRatingComponent from 'react-star-rating-component';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { translateError } from "/i18n/helpers.js";

const t = i18n.createTranslator();

/*
	WARNING
	Don't be fooled: I don't actually know what I'm doing.

	NOTE
	Here are the remaining "custom types" I still need to "implement":
	- star ratings
	- integers
	- floats
	- booleans
	- arrays (of objects, perhaps of other custom types)

	NOTE
	Here are the types I have already implemented:
	- locations (VfInputLocation)
	- strings (VfInputText)
	- string with externally-passed drop-down options (VfInputTextWithOptionList)
	- text areas (VfInputTextArea)

	NOTE
	And here are some other features that I will need to
	figure out where and how they fit in:
	- translation of allowed values
	- *custom validators involving Meteor Methods*
	- date fields (if necessary)

	NOTE
	Here are features that I have already hashed-out how to handle:
	- allowed values (yup.mixed.oneOf)
	- company name drop-downs (emptyCompanyNameField)
	- max length check for strings (yup.mixed.max)
	- regex validation (yup.string.matches)
	- min/max value check ("range check") for numbers (yup.number.min/max)
	- minimum number of words for pros/cons (yup.mixed.test(...(checks wordCount >= 5)))
	- optional/required fields (yup.mixed.required/notRequired)
	- hidden fields (if necessary) (included in Yup schema but not form, then initialized either in mapPropsToValues or handleSubmit)

	QUESTION (NOTE: this question is old, see below for answer):
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

	NOTE
		I have chosen to go whole-ham with Yup/validationSchema.
	This will allow us to enormously reduce the project's dependencies
	on SimpleSchema and thereby on Tracker, as well as force a switch
	to a more purely React-reliant style of programming, which will
	make use of GraphQL for data requirements more than Meteor methods,
	and thereby allow us to eliminate the Meteor methods that had
	previously been used so heavily by SimpleSchema. In fact, it even
	lays the groundword for removing universe:i18n, which is (currently)
	tightly-coupled with SimpleSchema on account of field labels and
	error messages, but will probably soon be used only for direct translation.
		All that will remain is to hunt down the places where SimpleSchema
	is used and replace it with Yup, and hunt down the places where
	universe:i18n is used automagically and replace it with direct translation,
	before removing universe:i18n can be replaced with an NPM i18n
	package via a simple refactoring process.
		Althought it is interesting to note that replacing universe:i18n
	will require refactoring further up the stack beyond just copy-pasting
	in new translation function calls, since code has had to be written
	and rewritten around universe:i18n's limitations, especially in this
	file.
*/

/*
	NOTE: next steps ->
	QUESTION:
		How do we determine errorAwareClassName? Ideally we would
		hook into Formik using fieldname rather than going directly
		to SimpleSchema, but it is possible that either solution
		might involve rethinking the architecture of this part of
		the component hierarchy so as to bring in whatever contextual
		information that is needed.
		NOTE/ANSWER:
			I did this by using props/connect "judiciously", and by
			not using SimpleSchema. :)
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
		NOTE/ANSWER:
			This is easy enough with Yup/validationSchema, and can be
			easily checked by running the form on the website.
	QUESTION:
		How will manually-calling SimpleSchema's validators affect
		the reactivity context assumed by the custom validators?
		NOTE/UPDATE: We are not using SimpleSchema. How re-implementing
			the custom validators from within yup.mixed.test
			affects reactivity remains to be seen.

*/

/*
	BUG
	The logic and architecture of these components cannot
	handle label translation for array member fields.
	Probably most of it needs to be moved out of withVizeFormatting,
	higher up the stack, probably into the custom components.
	That would seem to make the most sense, since the custom component
	will know both the labelgroupname, fieldname, in short everything
	that is currently used to calculate vfComponentId to generate
	the label, and also know enough about itself to tell withVizeFormatting
	whether anything different needs to be done.
	My current idea is to change labelgroupname to formgroupname,
	and add a prop for labelIdentifier that the custom component
	can pass in.
	TODO refactor the code in question, and make any then-necessary
	changes to the i18n JSON files. Hopefully this will make it easier
	to move forward, and less of a hassle to replace universe:i18n later.
	NOTE/UPDATE I decided to go further even than that, and just force
	the caller to pass in the label string as a prop to the custom component.
	This is *much* more straightforward than anything else I had come up with.

*/

const withVizeFormatting = function(vfComponent, fieldname, formgroupname, labelstring, errors) {
	const vfComponentId = `${formgroupname}.${fieldname}`; // BUG flesh this out later
	return (
		<div className="form-group">
			<div className={`form-group ${(errors !== undefined) ? "has-error" : ""}`}>
				<label className="control-label" htmlFor={vfComponentId}>
					{labelstring}
				</label>
				{vfComponent(vfComponentId)}
				<span className="help-block">
					<ErrorMessage name={fieldname}>
						{msg => translateError(msg)}
					</ErrorMessage>
				</span>
			</div>
		</div>
	)
};

export const VfInputText = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<input type="text" {...field} {...props} className="form-control" id={vfComponentId}/>
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.formgroupname,
	props.labelstring,
	props.formik.errors[props.name]
));

export const VfInputTextWithOptionList = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<input type="text" list={`${vfComponentId}.list`} {...field} {...props} className="form-control" id={vfComponentId} />
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
	props.formgroupname,
	props.labelstring,
	props.formik.errors[props.name]
));

export const VfInputTextArea = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<textarea {...field} {...props} className="form-control" id={vfComponentId}/>
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.formgroupname,
	props.labelstring,
	props.formik.errors[props.name]
));

export const VfInputLocation = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<div className="panel panel-default">
			<div className="panel-body">
				<Field name={props.name} render={() => (
					<div id={vfComponentId}>
						<VfInputText name={`${props.name}.city`} formgroupname={props.formgroupname} labelstring={t("SimpleSchema.labels.LocationSubFields.locationCity")} maxLength="300" placeholder={t("common.forms.locationCityPlaceholder")}/>
						<VfInputText name={`${props.name}.address`} formgroupname={props.formgroupname} labelstring={t("SimpleSchema.labels.LocationSubFields.locationAddress")} maxLength="300" placeholder={t("common.forms.locationAddressPlaceholder")}/>
						<VfInputText name={`${props.name}.industrialHub`} formgroupname={props.formgroupname} labelstring={t("SimpleSchema.labels.LocationSubFields.locationIndustrialHub")} maxLength="300" placeholder={t("common.forms.locationIndustrialHubPlaceholder")}/>
						{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
					</div>
				)}/>
			</div>
		</div>
	),
	props.name,
	props.formgroupname,
	props.labelstring,
	props.formik.errors[props.name]
));

export const VfInputInteger = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<input type="number" step="1" {...field} {...props} className="form-control" id={vfComponentId}/>
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.formgroupname,
	props.labelstring,
	props.formik.errors[props.name]
));

export const VfInputStarRating = connect((props) => withVizeFormatting(
	(vfComponentId) => (
		<Field name={props.name} render={({field}) => (
			<div>
				<StarRatingComponent
					starCount={5}
					// Functions for onStarClick, renderStarIcon,
					// and renderStarIconHalf are *heavily* borrowed
					// from the MIT-licensed example code for
					// react-star-rating-component:
					// https://github.com/voronianski/react-star-rating-component/blob/master/example
					// And in case you're wondering, then...
					// WARNING
					// I only have a vague idea of what's going on with this code,
					// easily the most mysterious part in onStarClick, which
					// somehow Just Works. Also I copy-pasted all the styling-related
					// code, and even added a line to /client/main.html in order
					// to get it to work.
					// NOTE
					// Don't ask me how to change the star size. I don't know.
					// BUG
					// I still don't really know why the error messages for the
					// star ratings won't display.
					starColor="#ffb400"
					emptyStarColor="#ffb400"
					onStarClick={
						(nextValue, prevValue, name, e) =>{
							const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

							if (xPos <= 0.5) {
								nextValue -= 0.5;
							}

							props.formik.setFieldValue(props.name, nextValue, true)
						}
					}
					renderStarIcon={(index, value) => {
						return (
							<span>
								<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
							</span>
						);
					}}
					renderStarIconHalf={() => {
						return (
							<span>
								<span style={{position: 'absolute'}}><i className="far fa-star" /></span>
								<span><i className="fas fa-star-half" /></span>
							</span>
						);
					}}
					id={vfComponentId}
					{...field}
					{...props}
				/>
				{/* <span>{(Meteor.isDevelopment) ? `${JSON.stringify(field)}\n${JSON.stringify(props)}` : ""}</span> */}
			</div>
		)}/>
	),
	props.name,
	props.formgroupname,
	props.labelstring,
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

export const readOnlyCompanyNameField = (props) => (
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
					formgroupname={props.formgroupname}
					value={companyName()}
					labelstring={t(`SimpleSchema.labels.${props.formgroupname}.companyName`)}
					readOnly="true"
				/>
			);
		}}
	</Query>
);

export const emptyCompanyNameField = (props) => (
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
					formgroupname={props.formgroupname}
					maxLength="100"
					optionlist={listOfCompanyNames()}
					labelstring={t(`SimpleSchema.labels.${props.formgroupname}.companyName`)}
					placeholder={t(`common.forms.${props.placeholdergroupname}.companyNamePlaceholder`)}
				/>
			);
		}}
	</Query>
);
