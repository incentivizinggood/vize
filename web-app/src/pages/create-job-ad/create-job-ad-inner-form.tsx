import React from "react";
import { Form, useFormikContext } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoney from "@material-ui/icons/AttachMoney";
import FormWrapper from "../forms/form-wrapper";

import { FormArray, Field } from "src/components/form-stuff";
import { translations } from "src/translations";

const T = translations.createJobAd;

interface CreateJobAdInnerFormProps {
	schema: any;
	submissionError: any;
	setSubmissionError: any;
}

function InnerForm(props: CreateJobAdInnerFormProps): any {
	return (
		<FormWrapper submitButtonText={T.submit} {...props}>
			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

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
							required
							t={T.fields.locations.industrialHub}
						/>
					</>
				)}
				T={T.fields.locations}
			/>

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
		</FormWrapper>
	);
}

export default InnerForm;
