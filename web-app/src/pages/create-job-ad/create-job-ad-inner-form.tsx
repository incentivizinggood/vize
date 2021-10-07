import React from "react";
import { Form, useFormikContext } from "formik";
import { Button } from "src/components/button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoney from "@material-ui/icons/AttachMoney";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import {
	FormArray,
	Field,
	FormToolbar,
	SubmissionError,
	PostFormFieldContainer,
	ShiftSelectionWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";
import { Box } from "@material-ui/core";

const T = translations.createJobAd;
function InnerForm({ submissionError }: any) {
	const { values }: any = useFormikContext();
	console.log("vak", values);
	return (
		<Form noValidate>
			<PostFormFieldContainer>
				<Field
					name="jobTitle"
					type="text"
					required
					t={T.fields.jobTitle}
				/>
				<Field
					name="jobDescription"
					multiline
					rows={6}
					required
					t={T.fields.jobDescription}
				/>
				<Field
					name="skills"
					multiline
					rows={6}
					required
					t={T.fields.responsibilities}
				/>
				<Field
					name="certificatesAndLicences"
					multiline
					rows={6}
					required
					t={T.fields.qualifications}
				/>
				<br />
				<T.fields.contractType
					renderer={(t: any) => (
						<Field
							name="contractType"
							type="radioButtons"
							className="verticleRadioField"
							label={t.label}
							options={[
								<FormControlLabel
									value="FULL_TIME"
									control={<Radio />}
									label={t.fullTime}
								/>,
								<FormControlLabel
									value="TEMPORARY"
									control={<Radio />}
									label={t.temporary}
								/>,
								<FormControlLabel
									value="PART_TIME"
									control={<Radio />}
									label={t.partTime}
								/>,
								<FormControlLabel
									value="INTERNSHIP"
									control={<Radio />}
									label={t.internship}
								/>,
								<FormControlLabel
									value="CONTRACTOR"
									control={<Radio />}
									label={t.contractor}
								/>,
							]}
						/>
					)}
				/>
				<br />
				<T.fields.minimunEducation
					renderer={(t) => (
						<Field
							name="minimunEducation"
							type="radioButtons"
							className="verticleRadioField"
							label={t.label}
							options={[
								<FormControlLabel
									value="SOME_HIGH_SCHOOL"
									control={<Radio />}
									label={t.someHighSchool}
								/>,
								<FormControlLabel
									value="HIGH_SCHOOL"
									control={<Radio />}
									label={t.completedHighSchool}
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
				<T.fields.minimumLanguage
					renderer={(t) => (
						<Field
							name="minimumEnglishProficiency"
							type="radioButtons"
							className="verticleRadioField"
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
				<FormArray
					name="shifts"
					ElementRender={({ name }: { name: string }) => (
						<T.fields.jobSchedule
							renderer={(t: any) => (
								<ShiftSelectionWrapper>
									<Field
										name={`${name}.startDay`}
										required
										select
										defaultValue={1}
										label={t.startDay.label}
									>
										<option value={1}>
											{t.startDay.monday}
										</option>
										<option value={2}>
											{t.startDay.tuesday}
										</option>
										<option value={3}>
											{t.startDay.wednesday}
										</option>
										<option value={4}>
											{t.startDay.thursday}
										</option>
										<option value={5}>
											{t.startDay.friday}
										</option>
										<option value={6}>
											{t.startDay.saturday}
										</option>
										<option value={0}>
											{t.startDay.sunday}
										</option>
									</Field>
									<Field
										name={`${name}.endDay`}
										select
										required
										defaultValue={5}
										label={t.endDay.label}
									>
										<option value={1}>
											{t.endDay.monday}
										</option>
										<option value={2}>
											{t.endDay.tuesday}
										</option>
										<option value={3}>
											{t.endDay.wednesday}
										</option>
										<option value={4}>
											{t.endDay.thursday}
										</option>
										<option value={5}>
											{t.endDay.friday}
										</option>
										<option value={6}>
											{t.endDay.saturday}
										</option>
										<option value={0}>
											{t.endDay.sunday}
										</option>
									</Field>
									<Field
										name={`${name}.startTime`}
										type="time"
										required
										defaultValue="08:00"
										label={t.startTime.label}
									/>
									<Field
										name={`${name}.endTime`}
										type="time"
										required
										defaultValue="18:00"
										label={t.endTime.label}
									/>
								</ShiftSelectionWrapper>
							)}
						/>
					)}
					T={T.fields.jobSchedule}
				/>
				<FormArray
					name="locations"
					ElementRender={({ name }: any) => (
						console.log(name),
						(
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
									required
									t={T.fields.locations.industrialHub}
								/>
							</>
						)
					)}
					T={T.fields.locations}
				/>
				<div style={{ marginTop: "30px" }}>
					<T.fields.salaryExplanation />
				</div>

				<T.fields.salaryType
					renderer={(t: any) => (
						<Field
							name="salaryType"
							select
							required
							defaultValue={t.yearlySalary}
							label={t.label}
							style={{ width: "100%" }}
						>
							<option value="YEARLY_SALARY">
								{t.yearlySalary}
							</option>
							<option value="MONTHLY_SALARY">
								{t.monthlySalary}
							</option>
							<option value="WEEKLY_SALARY">
								{t.weeklySalary}
							</option>
							<option value="DAILY_SALARY">
								{t.dailySalary}
							</option>
							<option value="HOURLY_WAGE">{t.hourlyWage}</option>
						</Field>
					)}
				/>

				<div style={{ display: "flex", marginTop: "-15px" }}>
					<Field
						name="salaryMin"
						type="number"
						fullWidth={false}
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoney />
								</InputAdornment>
							),
						}}
						style={{ width: "94%" }}
						t={T.fields.salaryMin}
					/>

					<Field
						name="salaryMax"
						type="number"
						fullWidth={false}
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoney />
								</InputAdornment>
							),
						}}
						style={{ width: "100%" }}
						t={T.fields.salaryMax}
					/>
				</div>

				<SubmissionError error={submissionError} />
			</PostFormFieldContainer>
			<FormToolbar>
				<Button $primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
