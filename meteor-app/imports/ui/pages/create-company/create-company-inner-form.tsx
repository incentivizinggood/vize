import React from "react";
import { Form } from "formik";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import { Button } from "imports/ui/components/button";
import { FormToolbar } from "imports/ui/components/form-layout";
import FormArray from "imports/ui/components/form-array";
import SubmissionError from "imports/ui/components/submission-error";
import { Field } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

const T = translations.createCompany;

function InnerForm({ submissionError }) {
	return (
		<Form>
			<Field name="name" type="text" t={T.fields.companyName} />

			<Field name="contactEmail" type="email" t={T.fields.contactEmail} />

			<Field
				name="yearEstablished"
				type="number"
				t={T.fields.yearEstablished}
			/>

			<Field name="numEmployees" select t={T.fields.numEmployees}>
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

			<Field name="industry" type="text" t={T.fields.industry} />

			<FormArray
				name="locations"
				ElementRender={({ name }) => (
					<>
						<Field
							name={`${name}.city`}
							type="text"
							t={T.fields.locations.city}
						/>
						<Field
							name={`${name}.address`}
							type="text"
							t={T.fields.locations.address}
						/>
						<Field
							name={`${name}.industrialHub`}
							type="text"
							t={T.fields.locations.industrialHub}
						/>
					</>
				)}
			/>

			<Field
				name="contactPhoneNumber"
				type="text"
				t={T.fields.contactPhoneNumber}
			/>

			<Field name="websiteURL" type="text" t={T.fields.websiteURL} />

			<Field
				name="descriptionOfCompany"
				multiline
				rows={6}
				t={T.fields.descriptionOfCompany}
			/>

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
