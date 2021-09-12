import React from "react";
import { Form } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoney from "@material-ui/icons/AttachMoney";
import { Button } from "src/components/button";

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
				 <div style={{ marginTop: "10px" }}>
			<T.fields.salaryType
				renderer={(t) => (
					<Field name="salaryType" select required label={t.label}>
						<option value="YEARLY_SALARY">{t.yearlySalary}</option>
						<option value="MONTHLY_SALARY">
							{t.monthlySalary}
						</option>
						<option value="WEEKLY_SALARY">{t.weeklySalary}</option>
						<option value="DAILY_SALARY">{t.dailySalary}</option>
						<option value="HOURLY_WAGE">{t.hourlyWage}</option>
					</Field>
				)}
			/>
			<div style={{ marginTop: "10px" }}>
				<T.fields.salaryExplanation />
			</div> 
				 <span>
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
			</span>

			<span>
				<T.fields.jobSchedule
					renderer={(t) => (
						<Field
							name="startDay"
							select
							fullWidth={false}
							required
							defaultValue={1}
							label={t.labelStartDay}
							style={{ width: "49%", marginRight: "2%" }}
						>
							<option value={1}>{t.monday}</option>
							<option value={2}>{t.tuesday}</option>
							<option value={3}>{t.wednesday}</option>
							<option value={4}>{t.thursday}</option>
							<option value={5}>{t.friday}</option>
							<option value={6}>{t.saturday}</option>
							<option value={0}>{t.sunday}</option>
						</Field>
					)}
				/>

				<T.fields.jobSchedule
					renderer={(t) => (
						<Field
							name="endDay"
							select
							fullWidth={false}
							required
							defaultValue={5}
							label={t.labelEndDay}
							style={{ width: "49%" }}
						>
							<option value={1}>{t.monday}</option>
							<option value={2}>{t.tuesday}</option>
							<option value={3}>{t.wednesday}</option>
							<option value={4}>{t.thursday}</option>
							<option value={5}>{t.friday}</option>
							<option value={6}>{t.saturday}</option>
							<option value={0}>{t.sunday}</option>
						</Field>
					)}
				/>
			</span>

			<span>
				<T.fields.jobSchedule
					renderer={(t) => (
						<Field
							name="startTime"
							type="time"
							fullWidth={false}
							required
							defaultValue="08:00"
							label={t.labelStartTime}
							style={{ width: "49%", marginRight: "2%" }}
						/>
					)}
				/>

				<T.fields.jobSchedule
					renderer={(t) => (
						<Field
							name="endTime"
							type="time"
							fullWidth={false}
							required
							defaultValue="18:00"
							label={t.labelEndTime}
							style={{ width: "49%" }}
						/>
					)}
				/>
			</span>

			<T.fields.contractType
				renderer={(t) => (
					<Field name="contractType" select required label={t.label}>
						<option value="FULL_TIME">{t.fullTime}</option>
						<option value="TEMPORARY">{t.temporary}</option>
						<option value="PART_TIME">{t.partTime}</option>
						<option value="INTERNSHIP">{t.internship}</option>
						<option value="CONTRACTOR">{t.contractor}</option>
					</Field>
				)}
			/>

			<Field
				name="jobDescription"
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

			<SubmissionError error={submissionError} />

			<FormToolbar>
				<Button $primary type="submit">
					<T.submit />
				</Button>
			</FormToolbar>
			</PostFormFieldContainer>
		</Form>
	);
}

export default InnerForm;
