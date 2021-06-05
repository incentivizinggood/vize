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
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	Typography,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";

const T = translations.createJobAd;
console.log(T.fields);
// {
// 	/* <T renderer={(t: any) => <FieldInner {...restProps} {...t} />} /> */
// }
// const Labels = translations.createJobAd.map();
// console.log(Labels);
const theme = createMuiTheme({
	palette: {
		secondary: {
			// This is green.A700 as hex.
			main: "#11cb5f",
		},
	},
});

function InnerForm({ submissionError }) {
	return (
		<ThemeProvider theme={theme}>
			<Form noValidate>
				<Typography variant="subtitle1">Job Title</Typography>
				<Field
					name="jobTitle"
					type="text"
					variant="outlined"
					required
					placeholder="Enter your job title"
					// t={T.fields.jobTitle}
				/>
				{/* 
				<FormArray
					name="locations"
					ElementRender={({ name }) => ( */}
				<>
					<Typography variant="subtitle1">Job Description</Typography>
					<Field
						name={`${name}.city`}
						type="text"
						required
						variant="outlined"
						placeholder="Enter a formal description of this job"
					/>
					<Typography variant="subtitle1">Job Skills</Typography>
					<Field
						name={`${name}.address`}
						type="text"
						required
						variant="outlined"
						placeholder="Enter your skills of this job"
					/>
					<Typography variant="subtitle1">
						Certificates & License
					</Typography>
					<Field
						name={`${name}.industrialHub`}
						type="text"
						required
						variant="outlined"
						placeholder="Enter your Certificates & License
						"
						// t={T.fields.locations.industrialHub}
					/>
				</>
				{/* )}
					T={T.fields.locations}
				/> */}
				<Typography variant="subtitle1">
					Minimum level of education
				</Typography>

				<Box display="flex">
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
								color="secondary"
							/>
						}
						label="Some High School"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Completed High School"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Some College"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Degree College"
					/>
				</Box>
				<Typography variant="subtitle1">
					Minimum language proficiency
				</Typography>
				<Box
					display="flex"
					justifyContent="space-between"
					alignSelf="left"
				>
					<Container>
						{" "}
						<Typography variant="h6">English</Typography>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Native"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Fluent"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Conversational"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Basic"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="None"
						/>
					</Container>{" "}
					<Container>
						<Typography variant="h6">Spanish</Typography>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Native"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Fluent"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Conversational"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="Basic"
						/>
						<FormControlLabel
							control={
								<Checkbox
									icon={<RadioButtonUncheckedOutlinedIcon />}
									checkedIcon={<CheckCircleOutlineIcon />}
									name="checkedH"
								/>
							}
							label="None"
						/>
					</Container>
				</Box>
				<Typography variant="subtitle1">
					Additional Requirements
				</Typography>
				<Field
					name="jobTitle"
					type="text"
					variant="outlined"
					multiline
					rows={6}
					required
					placeholder="List out any additional requirements for the position that were not captured above"
					// t={T.fields.jobTitle}
				/>
				{/* choose contract section */}
				<Typography variant="subtitle1">
					Choose Contract Type For This Job
				</Typography>
				{/* choose type from this job  */}
				<Box display="flex">
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Full Time"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Temporary"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Part Time"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Internship"
					/>
					<FormControlLabel
						control={
							<Checkbox
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name="checkedH"
							/>
						}
						label="Contractor"
					/>
				</Box>
				<T.fields.salaryType
					renderer={t => (
						<Field
							name="salaryType"
							select
							required
							label={t.label}
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
						renderer={t => (
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
						renderer={t => (
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
						renderer={t => (
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
						renderer={t => (
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
					renderer={t => (
						<Field
							name="contractType"
							select
							required
							label={t.label}
						>
							<option value="FULL_TIME">{t.fullTime}</option>
							<option value="TEMPORARY">{t.temporary}</option>
							<option value="PART_TIME">{t.partTime}</option>
							<option value="INTERNSHIP">{t.internship}</option>
							<option value="CONTRACTOR">{t.contractor}</option>
						</Field>
					)}
				/>
				<Typography variant="subtitle1">Job Description</Typography>
				<Field
					name="jobDescription"
					multiline
					rows={6}
					required
					variant="outlined"
					t={T.fields.jobDescription}
				/>
				<Typography variant="subtitle1">Responsibilities</Typography>
				<Field
					name="responsibilities"
					multiline
					rows={6}
					required
					variant="outlined"
					t={T.fields.responsibilities}
				/>
				<Typography variant="subtitle1">Qualifications</Typography>
				<Field
					name="qualifications"
					multiline
					rows={6}
					required
					variant="outlined"
					t={T.fields.qualifications}
				/>

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
		</ThemeProvider>
	);
}

export default InnerForm;
