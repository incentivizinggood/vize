import React from "react";
import { Form } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoney from "@material-ui/icons/AttachMoney";
import { SubmitButton } from "src/components/button";

import {
	FormArray,
	Field,
	FormToolbar,
	SubmissionError,
} from "src/components/form-stuff";
import { translations } from "src/translations";
import { PostElementContainer } from "src/components/form-stuff/style";
import { Box } from "@material-ui/core";
import CustomCheckbox from "src/components/form-stuff/field/checkbox";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";

const T = translations.createJobAd;
function InnerForm({ submissionError }: any) {
	return (
		<Form noValidate>
			<Field name="jobTitle" type="text" required t={T.fields.jobTitle} />

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
			<Box>
				<T.checkboxes.minimunEducation
					renderer={(t: any) => (
						<CustomCheckbox
							label={t.checkboxTitle}
							checkboxes={t.list}
						/>
					)}
				/>
				{/* <CustomCheckbox checkboxTitle={"test"} label={"test"} /> */}
			</Box>

			<T.fields.contractType
				renderer={t => (
					<Field name="contractType" select required label={t.label}>
						<option value="FULL_TIME">{t.fullTime}</option>
						<option value="TEMPORARY">{t.temporary}</option>
						<option value="PART_TIME">{t.partTime}</option>
						<option value="INTERNSHIP">{t.internship}</option>
						<option value="CONTRACTOR">{t.contractor}</option>
					</Field>
				)}
			/>
			<FormArray
				name="shifts"
				ElementRender={({ name }: { name: string }) => (
					<T.fields.jobSchedule
						renderer={(t: any) => (
							<Box display="flex" justifyContent="space-between">
								<Field
									name="startDay"
									select
									// fullWidth={false}
									required
									defaultValue={1}
									label={t.startDay.label}
									style={{ width: "100%" }}
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
									// fullWidth={false}
									required
									defaultValue={5}
									label={t.endDay.label}
									style={{ width: "100%" }}
								>
									<option value={1}>{t.endDay.monday}</option>
									<option value={2}>
										{t.endDay.tuesday}
									</option>
									<option value={3}>
										{t.endDay.wednesday}
									</option>
									<option value={4}>
										{t.endDay.thursday}
									</option>
									<option value={5}>{t.endDay.friday}</option>
									<option value={6}>
										{t.endDay.saturday}
									</option>
									<option value={0}>{t.endDay.sunday}</option>
								</Field>
								<Field
									name="startTime"
									type="time"
									// fullWidth={false}
									required
									defaultValue="08:00"
									label={t.startTime.label}
									style={{ width: "100%" }}
								/>
								<Field
									name="endTime"
									type="time"
									// fullWidth={false}
									required
									defaultValue="18:00"
									label={t.endTime.label}
									style={{ width: "100%" }}
								/>
							</Box>
						)}
					/>
				)}
				T={T.fields.jobSchedule}
			/>

			<FormArray
				name="locations"
				ElementRender={({ name }: any) => (
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
				renderer={t => (
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

			<FormToolbar>
				<SubmitButton
					variant="contained"
					size="large"
					type="submit"
					color="primary"
				>
					<T.submit />
				</SubmitButton>
			</FormToolbar>
		</Form>
	);
}

export default InnerForm;
