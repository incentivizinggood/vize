import React from "react";
import { Form } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { Button } from "src/components/button";
import {
	Field,
	FormToolbar,
	SubmissionError,
	FormArray,
} from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.userProfileForm;

function InnerForm({ submissionError }) {
	const currentYear = new Date().getFullYear();
	let years: Array<number> = [];
	for (let year = currentYear; year > currentYear - 30; year--) {
		years.push(year);
	}
	return (
		<Form noValidate>
			<Field name="fullName" type="text" required t={T.fields.fullName} />

			<Field
				name="phoneNumber"
				type="text"
				required
				t={T.fields.phoneNumber}
			/>

			<Field
				name="fiveYearGoal"
				type="text"
				required
				t={T.fields.fiveYearGoal}
			/>

			<FormArray
				name="workExperience"
				ElementRender={({ name }) => (
					<>
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
							<h5
								style={{
									marginTop: "15px",
									marginBottom: "-10px",
									fontWeight: "bold",
								}}
							>
								Start Date
							</h5>
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
							<h5
								style={{
									marginTop: "15px",
									marginBottom: "-10px",
									fontWeight: "bold",
								}}
							>
								End Date
							</h5>
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

			<Field
				name="skills"
				type="text"
				multiline
				rows={3}
				required
				t={T.fields.skills}
			/>

			<Field
				name="certificatesAndLicences"
				type="text"
				multiline
				rows={2}
				t={T.fields.certificatesAndLicences}
			/>

			<Field
				name="education"
				type="text"
				required
				t={T.fields.education}
			/>

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
