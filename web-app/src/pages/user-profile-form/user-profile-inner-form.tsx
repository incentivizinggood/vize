import React from "react";
import { Form, useFormikContext } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
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

const CheckboxLabel = styled.label`
	margin-bottom: -8px;
	font-weight: 500;
`;

const CheckboxField = styled(Field)`
	padding-left: 0px !important;
`;

function InnerForm({ submissionError }) {
	const { values } = useFormikContext();

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

			<FormArray
				name="workExperiences"
				ElementRender={({ name, index }) => (
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
										name={`${name}.startDateMonth`}
										select
										required
										label={t.month}
										fullWidth={false}
										style={{
											width: "47%",
											marginRight: "3%",
										}}
									>
										<option value={0}>{t.january}</option>
										<option value={1}>{t.february}</option>
										<option value={2}>{t.march}</option>
										<option value={3}>{t.april}</option>
										<option value={4}>{t.may}</option>
										<option value={5}>{t.june}</option>
										<option value={6}>{t.july}</option>
										<option value={7}>{t.august}</option>
										<option value={8}>{t.september}</option>
										<option value={9}>{t.october}</option>
										<option value={10}>{t.november}</option>
										<option value={11}>{t.december}</option>
									</Field>
								)}
							/>

							<T.fields.workExperiences
								renderer={t => (
									<Field
										name={`${name}.startDateYear`}
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
											<option value={year} key={i}>
												{year}
											</option>
										))}
									</Field>
								)}
							/>
						</span>

						<FieldTitle
							style={{
								marginTop: "15px",
								marginBottom: "-10px",
							}}
						>
							End Date
						</FieldTitle>
						{values.workExperiences[index].iCurrentlyWorkHere && (
							<>
								<br />
								Present
								<br />
							</>
						)}
						{!values.workExperiences[index].iCurrentlyWorkHere && (
							<span>
								<T.fields.workExperiences
									renderer={t => (
										<Field
											name={`${name}.endDateMonth`}
											select
											required
											label={t.month}
											fullWidth={false}
											style={{
												width: "47%",
												marginRight: "3%",
											}}
										>
											<option value={0}>
												{t.january}
											</option>
											<option value={1}>
												{t.february}
											</option>
											<option value={2}>{t.march}</option>
											<option value={3}>{t.april}</option>
											<option value={4}>{t.may}</option>
											<option value={5}>{t.june}</option>
											<option value={6}>{t.july}</option>
											<option value={7}>
												{t.august}
											</option>
											<option value={8}>
												{t.september}
											</option>
											<option value={9}>
												{t.october}
											</option>
											<option value={10}>
												{t.november}
											</option>
											<option value={11}>
												{t.december}
											</option>
										</Field>
									)}
								/>

								<T.fields.workExperiences
									renderer={t => (
										<Field
											name={`${name}.endDateYear`}
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
												<option value={year} key={i}>
													{year}
												</option>
											))}
										</Field>
									)}
								/>
							</span>
						)}

						<CheckboxLabel>
							<CheckboxField
								name={`${name}.iCurrentlyWorkHere`}
								type="checkbox"
							/>
							<T.fields.workExperiences.iCurrentlyWorkHere />
						</CheckboxLabel>

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
						name="highestLevelOfEducation"
						type="radioButtons"
						label={t.label}
						options={[
							<FormControlLabel
								value="SOME_HIGH_SCHOOL"
								control={<Radio />}
								label={t.someHighScool}
							/>,
							<FormControlLabel
								value="HIGH_SCHOOL"
								control={<Radio />}
								label={t.highSchool}
							/>,
							<FormControlLabel
								value="SOME_COLLEGE"
								control={<Radio />}
								label={t.someCollege}
							/>,
							<FormControlLabel
								value="COLLEGE_DEGREE"
								control={<Radio />}
								label={t.collegeDegree}
							/>,
						]}
					/>
				)}
			/>

			<br />
			<br />

			<FieldTitle>
				<T.fields.availability.label /> {" *"}
			</FieldTitle>
			<FormGroup>
				<CheckboxLabel>
					<CheckboxField name="morning" type="checkbox" />
					<T.fields.availability.morning />
				</CheckboxLabel>
				<CheckboxLabel>
					<CheckboxField name="afternoon" type="checkbox" />
					<T.fields.availability.afternoon />
				</CheckboxLabel>
				<CheckboxLabel>
					<CheckboxField name="night" type="checkbox" />
					<T.fields.availability.night />
				</CheckboxLabel>
			</FormGroup>

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
				What job do you want to have in 5 years? We'll match you with
				other people that have a similar goal.
			</FieldDescription>
			<FieldDescription>
				<PrivacyIcon style={{ marginRight: "5px" }} />
				This information will not be shared with any employer when you
				apply to a job.
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
