import React from "react";
import { Form } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import PrivacyIcon from "@material-ui/icons/Security";

import { Button } from "src/components/button";
import {
	Field,
	FormToolbar,
	SubmissionError,
	FormArray,
} from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.userProfileForm;

const currentYear = new Date().getFullYear();
let years: Array<number> = [];
for (let year = currentYear; year > currentYear - 30; year--) {
	years.push(year);
}

const FieldDescription = styled.p`
	font-size: 1em;
`;

const FieldTitle = styled.h5`
	font-weight: bold;
`;

function InnerForm({ submissionError }) {
	return (
		<Form noValidate>
			<Field name="fullName" type="text" required t={T.fields.fullName} />

			<Field
				name="phoneNumber"
				type="text"
				required
				t={T.fields.phoneNumber}
			/>

			<Field name="city" type="text" required t={T.fields.city} />

			<Field name="neighborhood" type="text" t={T.fields.neighborhood} />

			<Field name="address" type="text" t={T.fields.address} />

			<FormArray
				name="workExperience"
				ElementRender={({ name }) => (
					<>
						<h3 style={{ textAlign: "center", fontWeight: "bold" }}>
							Work Experience
						</h3>
						<Field
							name={`${name}.jobTitle`}
							type="text"
							required
							t={T.fields.workExperiences.jobTitle}
						/>
						<Field
							name={`${name}.companyName`}
							type="text"
							required
							t={T.fields.workExperiences.companyName}
						/>
						<Field
							name={`${name}.city`}
							type="text"
							required
							t={T.fields.workExperiences.city}
						/>

						<span>
							<FieldTitle
								style={{
									marginTop: "15px",
									marginBottom: "-10px",
								}}
							>
								Start Date
							</FieldTitle>
							<T.fields.workExperiences
								renderer={t => (
									<Field
										name="startDateMonth"
										select
										required
										label={t.month}
										fullWidth={false}
										style={{
											width: "47%",
											marginRight: "3%",
										}}
									>
										<option value="JANUARY">
											{t.january}
										</option>
										<option value="FEBRUARY">
											{t.february}
										</option>
										<option value="MARCH">{t.march}</option>
										<option value="APRIL">{t.april}</option>
										<option value="MAY">{t.may}</option>
										<option value="JUNE">{t.june}</option>
										<option value="JULY">{t.july}</option>
										<option value="AUGUST">
											{t.august}
										</option>
										<option value="SEPTEMBER">
											{t.september}
										</option>
										<option value="OCTOBER">
											{t.october}
										</option>
										<option value="NOVEMBER">
											{t.november}
										</option>
										<option value="DECEMBER">
											{t.december}
										</option>
									</Field>
								)}
							/>

							<T.fields.workExperiences
								renderer={t => (
									<Field
										name="startDateYear"
										select
										required
										label={t.year}
										fullWidth={false}
										style={{
											width: "47%",
											marginLeft: "3%",
										}}
									>
										{years.map((year, i) => (
											<option value="MARCH">
												{year}
											</option>
										))}
									</Field>
								)}
							/>
						</span>

						<span>
							<FieldTitle
								style={{
									marginTop: "15px",
									marginBottom: "-10px",
								}}
							>
								End Date
							</FieldTitle>
							<T.fields.workExperiences
								renderer={t => (
									<Field
										name="endDateMonth"
										select
										required
										label={t.month}
										fullWidth={false}
										style={{
											width: "47%",
											marginRight: "3%",
										}}
									>
										<option value="JANUARY">
											{t.january}
										</option>
										<option value="FEBRUARY">
											{t.february}
										</option>
										<option value="MARCH">{t.march}</option>
										<option value="APRIL">{t.april}</option>
										<option value="MAY">{t.may}</option>
										<option value="JUNE">{t.june}</option>
										<option value="JULY">{t.july}</option>
										<option value="AUGUST">
											{t.august}
										</option>
										<option value="SEPTEMBER">
											{t.september}
										</option>
										<option value="OCTOBER">
											{t.october}
										</option>
										<option value="NOVEMBER">
											{t.november}
										</option>
										<option value="DECEMBER">
											{t.december}
										</option>
									</Field>
								)}
							/>

							<T.fields.workExperiences
								renderer={t => (
									<Field
										name="endDateYear"
										select
										required
										label={t.year}
										fullWidth={false}
										style={{
											width: "47%",
											marginLeft: "3%",
										}}
									>
										{years.map((year, i) => (
											<option value="MARCH">
												{year}
											</option>
										))}
									</Field>
								)}
							/>
						</span>

						<T.fields.workExperiences
							renderer={t => (
								<FormControlLabel
									value="Placeholder"
									control={<Checkbox color="primary" />}
									label={t.iCurrentlyWorkHere}
									style={{ marginBottom: "-10px" }}
								/>
							)}
						/>

						<Field
							name={`${name}.experienceDescription`}
							multiline
							rows={6}
							required
							t={T.fields.workExperiences.experienceDescription}
						/>
					</>
				)}
				T={T.fields.workExperiences}
			/>

			<br />
			<FieldTitle>Skills</FieldTitle>
			<FieldDescription>
				Write a list of any of manufaturing related skills that you
				have. Seperate out each skill with a comma.
			</FieldDescription>

			<Field
				name="skills"
				type="text"
				multiline
				rows={3}
				required
				t={T.fields.skills}
			/>

			<br />
			<br />
			<br />
			<FieldTitle>Certificates & Licences</FieldTitle>
			<FieldDescription>
				Write a list of any manufacturing related certificates and
				licenses that you have. Seperate out each Certificate / Licence
				with a comma.
			</FieldDescription>
			<Field
				name="certificatesAndLicences"
				type="text"
				multiline
				rows={2}
				t={T.fields.certificatesAndLicences}
			/>

			<br />
			<br />
			<br />

			<T.fields.education
				renderer={t => (
					<Field
						name="employmentStatus"
						type="radioButtons"
						label={t.label}
						options={[
							<FormControlLabel
								value="FORMER"
								control={<Radio />}
								label={t.someHighScool}
							/>,
							<FormControlLabel
								value="CURRENT"
								control={<Radio />}
								label={t.highSchool}
							/>,
							<FormControlLabel
								value="CURRENT"
								control={<Radio />}
								label={t.someCollege}
							/>,
							<FormControlLabel
								value="CURRENT"
								control={<Radio />}
								label={t.collegeDegree}
							/>,
						]}
					/>
				)}
			/>

			<br />
			<br />

			<T.fields.availability
				renderer={t => (
					<Field
						name="availability"
						type="checkboxButtons"
						label={t.label}
						options={[
							<FormControlLabel
								value="FORMER"
								control={<Checkbox />}
								label={t.morning}
							/>,
							<FormControlLabel
								value="CURRENT"
								control={<Checkbox />}
								label={t.afternoon}
							/>,
							<FormControlLabel
								value="CURRENT"
								control={<Checkbox />}
								label={t.night}
							/>,
						]}
					/>
				)}
			/>

			<Field
				name="availabilityComments"
				type="text"
				multiline
				rows={2}
				t={T.fields.availabilityComments}
			/>

			<br />
			<br />
			<br />
			<FieldTitle>Long Term Professional Goal</FieldTitle>
			<FieldDescription>
				Where do you want to be professionally in 3-10 years? What is
				your dream job or dream company?
			</FieldDescription>
			<FieldDescription>
				<PrivacyIcon style={{ marginRight: "5px" }} />
				This information will not be shared with any employer when you
				apply to a job. If you choose to fill out this field, we will
				use your goal to match you with other workers that have a
				similar goal.
			</FieldDescription>
			<Field name="longTermGoal" type="text" t={T.fields.longTermGoal} />

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button $primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
