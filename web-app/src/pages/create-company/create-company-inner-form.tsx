import React from "react";

import { FormArray, Field } from "src/components/form-stuff";
import { translations } from "src/translations";
import FormWrapper from "../forms/form-wrapper";

const T = translations.createCompany;

interface CreateCompanyInnerFormProps {
	schema: any;
	submissionError: any;
	setSubmissionError: any;
}

function InnerForm(props: CreateCompanyInnerFormProps): any {
	return (
		<FormWrapper submitButtonText={T.submit} {...props}>
			<Field name="name" type="text" required t={T.fields.companyName} />

			<Field
				name="contactEmail"
				type="email"
				required
				t={T.fields.contactEmail}
			/>

			<Field
				name="yearEstablished"
				type="number"
				t={T.fields.yearEstablished}
			/>

			<Field name="numEmployees" select t={T.fields.numEmployees}>
				{
					// TODO: Refactor
					[
						<option value="">(Select One)</option>,
						...[
							"1 - 50",
							"51 - 500",
							"501 - 2000",
							"2001 - 5000",
							"5000+",
						].map((x) => <option value={x}>{x}</option>),
					]
				}
			</Field>

			<Field name="industry" type="text" t={T.fields.industry} />

			<FormArray
				name="locations"
				ElementRender={({ name }) => (
					<>
						<Field
							name={`${name}.city`}
							type="text"
							required
							t={T.fields.locations.city}
						/>
						<Field
							name={`${name}.address`}
							type="text"
							required
							t={T.fields.locations.address}
						/>
						<Field
							name={`${name}.industrialHub`}
							type="text"
							t={T.fields.locations.industrialHub}
						/>
					</>
				)}
				T={T.fields.locations}
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
		</FormWrapper>
	);
}

export default InnerForm;
