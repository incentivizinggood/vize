import React from "react";
import { Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import { Button } from "imports/ui/components/button";
import { FormToolbar } from "imports/ui/components/form-layout";
import FormArray from "imports/ui/components/form-array";
import SubmissionError from "imports/ui/components/submission-error";

const t = i18n.createTranslator("common.forms.createCompany");
const T = i18n.createComponent(t);

function InnerForm({ submissionError }) {
	return (
		<Form>
			<Field
				name="name"
				type="text"
				label={t("fields.name.label")}
				placeholder={t("fields.name.placeholder")}
				component={TextField}
				fullWidth
			/>

			<Field
				name="contactEmail"
				type="email"
				label={t("fields.contactEmail.label")}
				placeholder={t("fields.contactEmail.placeholder")}
				component={TextField}
				fullWidth
			/>

			<Field
				name="yearEstablished"
				type="number"
				label={t("fields.yearEstablished.label")}
				component={TextField}
				fullWidth
			/>

			<Field
				name="numEmployees"
				select
				label={t("fields.numEmployees.label")}
				component={TextField}
				fullWidth
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
			</Field>

			<Field
				name="industry"
				type="text"
				label={t("fields.industry.label")}
				placeholder={t("fields.industry.placeholder")}
				component={TextField}
				fullWidth
			/>

			<FormArray
				name="locations"
				ElementRender={({ name }) => (
					<>
						<Field
							name={`${name}.city`}
							type="text"
							label={t("fields.locations.city.label")}
							placeholder={t("fields.locations.city.placeholder")}
							component={TextField}
							fullWidth
						/>
						<Field
							name={`${name}.address`}
							type="text"
							label={t("fields.locations.address.label")}
							placeholder={t(
								"fields.locations.address.placeholder"
							)}
							component={TextField}
							fullWidth
						/>
						<Field
							name={`${name}.industrialHub`}
							type="text"
							label={t("fields.locations.industrialHub.label")}
							placeholder={t(
								"fields.locations.industrialHub.placeholder"
							)}
							component={TextField}
							fullWidth
						/>
					</>
				)}
			/>

			<Field
				name="contactPhoneNumber"
				type="text"
				label={t("fields.contactPhoneNumber.label")}
				placeholder={t("fields.contactPhoneNumber.placeholder")}
				component={TextField}
				fullWidth
			/>

			<Field
				name="websiteURL"
				type="text"
				label={t("fields.websiteURL.label")}
				placeholder={t("fields.websiteURL.placeholder")}
				component={TextField}
				fullWidth
			/>

			<Field
				name="descriptionOfCompany"
				multiline
				rows={6}
				label={t("fields.descriptionOfCompany.label")}
				placeholder={t("fields.descriptionOfCompany.placeholder")}
				component={TextField}
				fullWidth
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
