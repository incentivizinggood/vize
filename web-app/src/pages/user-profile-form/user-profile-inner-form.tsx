import React from "react";
import { Form, useFormikContext, FieldArray } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import PrivacyIcon from "@material-ui/icons/Security";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import MaskedInput from "react-text-mask";
import TextField from "@material-ui/core/TextField";

import { Button } from "src/components/button";
import {
	ArrayContainer,
	ElementContainer,
	ElementDeleteButton,
} from "src/components/form-stuff/array";
import { Field, FormToolbar, SubmissionError } from "src/components/form-stuff";

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
const phoneNumberMask = [
	"(",
	/[1-9]/,
	/\d/,
	/\d/,
	")",
	" ",
	/\d/,
	/\d/,
	/\d/,
	"-",
	/\d/,
	/\d/,
	/\d/,
	/\d/,
];

interface UserProfileInnerFormProps {
	submissionError: any;
	profileExists: boolean;
}

function InnerForm({
	submissionError,
	profileExists,
}: UserProfileInnerFormProps) {
	const { values }: any = useFormikContext();
	const submitButtonText = profileExists ? <T.update /> : <T.submit />;

	return (
		<Form noValidate>
			<Field name="fullName" type="text" required t={T.fields.fullName} />

			<Field
				name="phoneNumber"
				type="phoneNumber"
				required
				t={T.fields.phoneNumber}
			/>

			<Field name="city" type="text" required t={T.fields.city} />

			<Field name="neighborhood" type="text" t={T.fields.neighborhood} />

			{/* Had to manually code the form array here because I was getting a bug where the field would lose focus after typing a character */}
			<FieldArray
				name="workExperiences"
				render={arrayHelpers => (
					<ArrayContainer>
						{values.workExperiences.map((_: any, index: number) => (
							<ElementContainer key={`experience-${index}`}>
								<ElementDeleteButton
									type="button"
									onClick={() => arrayHelpers.remove(index)}
								>
									<FontAwesomeIcon icon={faTimes} />
								</ElementDeleteButton>
								<>
									<h3
										style={{
											textAlign: "center",
											fontWeight: "bold",
										}}
									>
										Work Experience
									</h3>
									<Field
										name={`workExperiences[${index}].jobTitle`}
										type="text"
										required
										t={T.fields.workExperiences.jobTitle}
									/>
									<Field
										name={`workExperiences[${index}].companyName`}
										type="text"
										required
										t={T.fields.workExperiences.companyName}
									/>
									<Field
										name={`workExperiences[${index}].city`}
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
													name={`workExperiences[${index}].startDateMonth`}
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
													<option value={2}>
														{t.march}
													</option>
													<option value={3}>
														{t.april}
													</option>
													<option value={4}>
														{t.may}
													</option>
													<option value={5}>
														{t.june}
													</option>
													<option value={6}>
														{t.july}
													</option>
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
													name={`workExperiences[${index}].startDateYear`}
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
														<option
															value={year}
															key={i}
														>
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
									{values.workExperiences[index]
										.iCurrentlyWorkHere && (
										<>
											<br />
											Present
											<br />
										</>
									)}
									{!values.workExperiences[index]
										.iCurrentlyWorkHere && (
										<span>
											<T.fields.workExperiences
												renderer={t => (
													<Field
														name={`workExperiences[${index}].endDateMonth`}
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
														<option value={2}>
															{t.march}
														</option>
														<option value={3}>
															{t.april}
														</option>
														<option value={4}>
															{t.may}
														</option>
														<option value={5}>
															{t.june}
														</option>
														<option value={6}>
															{t.july}
														</option>
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
														name={`workExperiences[${index}].endDateYear`}
														select
														required
														label={t.year}
														fullWidth={false}
														style={{
															width: "47%",
															marginLeft: "3%",
														}}
													>
														{years.map(
															(year, i) => (
																<option
																	value={year}
																	key={i}
																>
																	{year}
																</option>
															)
														)}
													</Field>
												)}
											/>
										</span>
									)}

									<CheckboxLabel>
										<CheckboxField
											name={`workExperiences[${index}].iCurrentlyWorkHere`}
											type="checkbox"
										/>
										<T.fields.workExperiences.iCurrentlyWorkHere />
									</CheckboxLabel>

									<Field
										name={`workExperiences[${index}].experienceDescription`}
										multiline
										rows={6}
										required
										t={
											T.fields.workExperiences
												.experienceDescription
										}
									/>
								</>
							</ElementContainer>
						))}

						<Button
							type="button"
							onClick={() => arrayHelpers.push("")}
						>
							<FontAwesomeIcon icon={faPlus} /> {"  "}
							<T.fields.workExperiences.addElement
								array={values.workExperiences}
							/>
						</Button>
					</ArrayContainer>
				)}
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

			<T.fields.spanishProficiency
				renderer={t => (
					<Field
						name="spanishProficiency"
						type="radioButtons"
						label={t.label}
						options={[
							<FormControlLabel
								value="NATIVE_LANGUAGE"
								control={<Radio />}
								label={t.native}
							/>,
							<FormControlLabel
								value="FLUENT"
								control={<Radio />}
								label={t.fluent}
							/>,
							<FormControlLabel
								value="CONVERSATIONAL"
								control={<Radio />}
								label={t.conversational}
							/>,
							<FormControlLabel
								value="BASIC"
								control={<Radio />}
								label={t.basic}
							/>,
							<FormControlLabel
								value="NO_PROFICIENCY"
								control={<Radio />}
								label={t.none}
							/>,
						]}
					/>
				)}
			/>

			<br />
			<br />
			<br />

			<T.fields.englishProficiency
				renderer={t => (
					<Field
						name="englishProficiency"
						type="radioButtons"
						label={t.label}
						options={[
							<FormControlLabel
								value="NATIVE_LANGUAGE"
								control={<Radio />}
								label={t.native}
							/>,
							<FormControlLabel
								value="FLUENT"
								control={<Radio />}
								label={t.fluent}
							/>,
							<FormControlLabel
								value="CONVERSATIONAL"
								control={<Radio />}
								label={t.conversational}
							/>,
							<FormControlLabel
								value="BASIC"
								control={<Radio />}
								label={t.basic}
							/>,
							<FormControlLabel
								value="NO_PROFICIENCY"
								control={<Radio />}
								label={t.none}
							/>,
						]}
					/>
				)}
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
					{submitButtonText}
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
