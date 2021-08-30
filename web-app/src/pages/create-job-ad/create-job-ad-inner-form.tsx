import React from "react";
import { Form } from "formik";
import { SubmitButton } from "src/components/button";
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
					optional="*"
					multiline
					rows={6}
					required
					t={T.fields.jobDescription}
				/>
				<Field
					name="responsibilities"
					multiline
					rows={6}
					required
					t={T.fields.responsibilities}
				/>
				<Field
					name="qualifications"
					multiline
					rows={6}
					required
					t={T.fields.qualifications}
				/>
				<T.fields.minimunEducation
					renderer={t => (
						<Field
							name="minimunEducation"
							type="radioButtons"
							className="verticleRadioField"
							label={t.label}
							options={[
								<FormControlLabel
									value="someHighSchool"
									control={<Radio />}
									label={t.someHighSchool}
								/>,
								<FormControlLabel
									value="completedHighSchool"
									control={<Radio />}
									label={t.completedHighSchool}
								/>,
								<FormControlLabel
									value="someCollege"
									control={<Radio />}
									label={t.someCollege}
								/>,
								<FormControlLabel
									value="collegeDegree"
									control={<Radio />}
									label={t.collegeDegree}
								/>,
							]}
						/>
					)}
				/>
				{/* Minimum Level of education */}
				<T.fields.minimumLanguage
					renderer={t => (
						<Field
							name="minimunEducation"
							type="radioButtons"
							className="verticleRadioField"
							// width="45%"
							label={t.label}
							options={[
								<FormControlLabel
									value="native"
									control={<Radio />}
									label={t.native}
								/>,
								<FormControlLabel
									value="fluent"
									control={<Radio />}
									label={t.fluent}
								/>,
								<FormControlLabel
									value="conversational"
									control={<Radio />}
									label={t.conversational}
								/>,
								<FormControlLabel
									value="basic"
									control={<Radio />}
									label={t.basic}
								/>,
								<FormControlLabel
									value="none"
									control={<Radio />}
									label={t.none}
								/>,
							]}
						/>
					)}
				/>
				{/* end */}
				<FormArray
					name="shifts"
					ElementRender={({ name }: { name: string }) => (
						<T.fields.jobSchedule
							renderer={(t: any) => (
								<ShiftSelectionWrapper>
									<Field
										name="startDay"
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
										name="endDay"
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
										name="startTime"
										type="time"
										required
										defaultValue="08:00"
										label={t.startTime.label}
									/>
									<Field
										name="endTime"
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
							<option value={1}>{t.yearlySalary}</option>
							<option value={2}>{t.monthlySalary}</option>
							<option value={3}>{t.weeklySalary}</option>
							<option value={4}>{t.dailySalary}</option>
							<option value={5}>{t.hourlyWage}</option>
						</Field>
					)}
				/>
				<Box>
					<T.fields.contractType
						renderer={(t: any) => (
							<Field
								name="contractType"
								type="radioButtons"
								className="verticleRadioField"
								// display="block"
								label={t.label}
								options={[
									<FormControlLabel
										value="fullTime"
										control={<Radio />}
										label={t.fullTime}
									/>,
									<FormControlLabel
										value="partTime"
										control={<Radio />}
										label={t.partTime}
									/>,
									<FormControlLabel
										value="internship"
										control={<Radio />}
										label={t.internship}
									/>,

									<FormControlLabel
										value="temporary"
										control={<Radio />}
										label={t.temporary}
									/>,
									<FormControlLabel
										value="contractor"
										control={<Radio />}
										label={t.contractor}
									/>,
								]}
							/>
						)}
					/>
				</Box>
				{/* <div style={{ marginTop: "10px" }}>
				<T.fields.salaryExplanation />
			</div> */}
				{/* <span>
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
					style={{ width: "49%", marginRight: "2%" }}
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
					style={{ width: "49%" }}
					t={T.fields.salaryMax}
				/>
			</span> */}
				<SubmissionError error={submissionError} />
			</PostFormFieldContainer>
			<FormToolbar>
				<SubmitButton
					variant="contained"
					size="large"
					type="submit"
					className="form-button"
				>
					<T.submit />
				</SubmitButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
