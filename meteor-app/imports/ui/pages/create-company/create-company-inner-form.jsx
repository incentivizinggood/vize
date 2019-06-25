import React from "react";
import { Form } from "formik";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import FormGroup from "/imports/ui/components/form-group";
import { Button } from "/imports/ui/components/button";
import { FormToolbar } from "/imports/ui/components/form-layout.jsx";
import FormArray from "/imports/ui/components/form-array.jsx";
import SubmissionError from "/imports/ui/components/submission-error.jsx";

const t = i18n.createTranslator("common.forms.createCompany");
const T = i18n.createComponent(t);

function InnerForm({ submissionError }) {
	return (
		<Form>
			<FormGroup
				fieldName="name"
				type="text"
				label={t("fields.name.label")}
				placeholder={t("fields.name.placeholder")}
			/>

			<FormGroup
				fieldName="contactEmail"
				type="email"
				label={t("fields.contactEmail.label")}
				placeholder={t("fields.contactEmail.placeholder")}
			/>

			<FormGroup
				fieldName="yearEstablished"
				type="number"
				label={t("fields.yearEstablished.label")}
			/>

			<FormGroup
				fieldName="numEmployees"
				type="select"
				label={t("fields.numEmployees.label")}
			>
				{// TODO: Refactor
				[
					<option value="">(Select One)</option>,
					...[
						"1 - 50",
						"51 - 500",
						"501 - 2000",
						"2001 - 5000",
						"5000+",
					].map(x => <option value={x}>{x}</option>),
				]}
			</FormGroup>

			<FormGroup
				fieldName="industry"
				type="text"
				label={t("fields.industry.label")}
				placeholder={t("fields.industry.placeholder")}
			/>

			<FormArray
				name="locations"
				ElementRender={({ name }) => (
					<>
						<FormGroup
							fieldName={`${name}.city`}
							type="text"
							label={t("fields.locations.city.label")}
							placeholder={t("fields.locations.city.placeholder")}
						/>
						<FormGroup
							fieldName={`${name}.address`}
							type="text"
							label={t("fields.locations.address.label")}
							placeholder={t(
								"fields.locations.address.placeholder"
							)}
						/>
						<FormGroup
							fieldName={`${name}.industrialHub`}
							type="text"
							label={t("fields.locations.industrialHub.label")}
							placeholder={t(
								"fields.locations.industrialHub.placeholder"
							)}
						/>
					</>
				)}
			/>

			<FormGroup
				fieldName="contactPhoneNumber"
				type="text"
				label={t("fields.contactPhoneNumber.label")}
				placeholder={t("fields.contactPhoneNumber.placeholder")}
			/>

			<FormGroup
				fieldName="websiteURL"
				type="text"
				label={t("fields.websiteURL.label")}
				placeholder={t("fields.websiteURL.placeholder")}
			/>

			<FormGroup
				fieldName="descriptionOfCompany"
				type="textarea"
				rows={6}
				label={t("fields.descriptionOfCompany.label")}
				placeholder={t("fields.descriptionOfCompany.placeholder")}
			/>

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button primary type="submit">
					<T>submit</T>
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
