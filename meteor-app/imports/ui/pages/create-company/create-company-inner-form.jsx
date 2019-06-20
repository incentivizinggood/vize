import React from "react";
import { Form } from "formik";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import FormGroup from "/imports/ui/components/form-group";
import { Button } from "/imports/ui/components/button";
import { FormToolbar } from "/imports/ui/components/form-layout.jsx";

/*
Locations

    Location 1
    City
    Address
    Industrial Park
*/

function InnerForm() {
	return (
		<Form>
			<FormGroup
				fieldName="name"
				type="text"
				label="Company Name"
				placeholder=""
			/>

			<FormGroup
				fieldName="contactEmail"
				type="email"
				label="Contact Email"
				placeholder=""
			/>

			<FormGroup
				fieldName="yearEstablished"
				type="number"
				label="Year Established"
				placeholder=""
			/>

			<FormGroup
				fieldName="numEmployees"
				type="select"
				label="Number of Employees"
				placeholder=""
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
				label="Industry"
				placeholder=""
			/>

			{/*
				<FormGroup
					fieldName="locations"
					type="???"
					label="Locations"
					placeholder=""
				/>
			*/}

			<FormGroup
				fieldName="contactPhoneNumber"
				type="text"
				label="Contact Phone Number"
				placeholder=""
			/>

			<FormGroup
				fieldName="websiteURL"
				type="text"
				label="Website URL"
				placeholder=""
			/>

			<FormGroup
				fieldName="descriptionOfCompany"
				type="textarea"
				rows={6}
				label="Description of Company"
				placeholder=""
			/>

			<FormToolbar>
				<Button primary type="submit">
					Submit
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default withUpdateOnChangeLocale(InnerForm);
