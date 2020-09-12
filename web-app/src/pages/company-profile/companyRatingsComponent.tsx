import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CircularProgressbar } from "react-circular-progressbar";

import { CompanyRatingsComponentFragment } from "generated/graphql-operations";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

const styles = {
	cardActions: {
		display: "block",
		textAlign: "initial",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	size: {
		maxHeight: 200,
	},
};

interface ChangingProgressbarProps {
	percentage: number;
}

function ChangingProgressbar({ percentage }: ChangingProgressbarProps) {
	// TODO: animate this
	return (
		<CircularProgressbar
			value={percentage}
			text={`${percentage}%`}
			strokeWidth={10}
		/>
	);
}

interface CompanyRatingProps {
	company: CompanyRatingsComponentFragment;
}

function CompanyRating(props: CompanyRatingProps): JSX.Element {
	// 	componentDidMount(){
	//   //Do this to all components you would like to disable the ripple effect.
	//   CompanyRating.defaultProps.disableTouchRipple = true;
	//   CompanyRating.defaultProps.disableFocusRipple = true;
	// }

	// The number of digits to display after the decimal point.
	const numDigits = 2;
	const { classes } = props;

	// TODO: Handle nulls properly
	if (!props.company.avgStarRatings) {
		return (
			<>
				<h3 style={{ textAlign: "center" }}>
					<T.review_tab.have_you_worked_at /> {props.company.name}
					{"? "}
					<T.review_tab.first_review />
				</h3>
				<br />
			</>
		);
	}

	return (
		<div>
			<div className="row">
				<div className="col-md-6  bodr_lft">
					<Card className={classes.card}>
						<CardMedia>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
							>
								<div className="star_border ">
									<label>
										<T.company_ratings.overall />
									</label>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<StarRatings
										rating={
											props.company.avgStarRatings
												.overallSatisfaction
										}
										starDimension="20px"
										starSpacing="1.6px"
									/>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<label>
										{props.company.avgStarRatings.overallSatisfaction.toFixed(
											numDigits
										)}
									</label>
								</div>
								<div className="tab_str">
									<table>
										<tbody>
											<tr>
												<td>
													<label
														htmlFor="input-2"
														className="control-label  lef_label"
													>
														<T.company_ratings.health_safety />
													</label>
												</td>
												<td>
													{/* star ratings are left */}
													<div className="row">
														<StarRatings
															rating={
																props.company
																	.avgStarRatings
																	.healthAndSafety
															}
															starDimension="20px"
															starSpacing="1.8px"
														/>
														&nbsp;&nbsp;{" "}
														<label>
															{props.company.avgStarRatings.healthAndSafety.toFixed(
																numDigits
															)}
														</label>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<label
														htmlFor="input-3"
														className="control-label lef_label"
													>
														<T.company_ratings.work_env />
													</label>
												</td>
												<td>
													<div className="row">
														<StarRatings
															rating={
																props.company
																	.avgStarRatings
																	.workEnvironment
															}
															starDimension="20px"
															starSpacing="1.8px"
														/>
														&nbsp;&nbsp;{" "}
														<label>
															{props.company.avgStarRatings.workEnvironment.toFixed(
																numDigits
															)}
														</label>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<label
														htmlFor="input-4"
														className="control-label   lef_label"
													>
														<T.company_ratings.benefits />
													</label>
												</td>
												<td>
													<div className="row">
														<StarRatings
															rating={
																props.company
																	.avgStarRatings
																	.benefits
															}
															starDimension="20px"
															starSpacing="1.8px"
														/>
														&nbsp;&nbsp;{" "}
														<label>
															{props.company.avgStarRatings.benefits.toFixed(
																numDigits
															)}
														</label>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													{" "}
													<label
														htmlFor="input-5"
														className="control-label  lef_label"
													>
														<T.company_ratings.manager_relation />
													</label>
												</td>
												<td>
													<div className="row">
														<StarRatings
															rating={
																props.company
																	.avgStarRatings
																	.managerRelationship
															}
															starDimension="20px"
															starSpacing="1.8px"
														/>
														&nbsp;&nbsp;{" "}
														<label>
															{props.company.avgStarRatings.managerRelationship.toFixed(
																numDigits
															)}
														</label>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Typography>
						</CardMedia>
					</Card>
				</div>
				<br />
				<br />
				<div style={{ maxHeight: "10%" }} className="col-md-6">
					<center>
						{" "}
						<h3>
							<b>
								{" "}
								<T.company_ratings.recommend />{" "}
							</b>
						</h3>
					</center>
					<br />
					<div
						style={{
							width: "50%",
							height: "10%",
							margin: "0 auto",
						}}
					>
						<ChangingProgressbar
							percentage={Math.round(
								props.company.percentRecommended * 100
							)}
						/>
					</div>

					<center>
						<div className="col-md-6">
							<div className="num_sett">
								<br />
								<br />
								<h1>
									{props.company.avgNumMonthsWorked.toFixed(
										numDigits
									)}{" "}
								</h1>
							</div>
						</div>
						<div className="col-md-6">
							<div className="num_sett">
								{" "}
								<span>
									<T.company_ratings.average_num />{" "}
									<T.company_ratings.months_worked />
								</span>
							</div>
						</div>
					</center>
				</div>
				<div className="clear" />
			</div>
		</div>
	);
}

CompanyRating.propTypes = {
	classes: PropTypes.object.isRequired,
};

// Temporary work around for missing data.
CompanyRating.defaultProps = {
	company: {
		avgNumMonthsWorked: NaN,
		percentRecommended: NaN,
		avgStarRatings: {
			healthAndSafety: NaN,
			managerRelationship: NaN,
			workEnvironment: NaN,
			benefits: NaN,
			overallSatisfaction: NaN,
		},
	},
};

export default withStyles(styles, { withTheme: true })(CompanyRating);
