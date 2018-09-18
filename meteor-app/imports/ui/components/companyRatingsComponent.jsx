import React from "react";
import StarRatings from "react-star-ratings";
import CircularProgressbar from "react-circular-progressbar";

import i18n from "meteor/universe:i18n";

const T = i18n.createComponent();

class ChangingProgressbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPercentageIndex: 0,
		};
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				currentPercentageIndex:
					(this.state.currentPercentageIndex + 1) %
					this.props.percentages.length,
			});
		}, this.props.interval);
	}

	getStyles() {
		return this.props.stylesForPercentage
			? this.props.stylesForPercentage(this.getCurrentPercentage())
			: {};
	}

	getCurrentPercentage() {
		return this.props.percentages[this.state.currentPercentageIndex];
	}

	render() {
		return (
			<CircularProgressbar
				{...this.props}
				percentage={this.getCurrentPercentage()}
				styles={this.getStyles()}
			/>
		);
	}
}
ChangingProgressbar.defaultProps = {
	interval: 100000,
};

export default function CompanyRating(props) {
	// The number of digits to display after the decimal point.
	const numDigits = 2;

	return (
		<div>
			<div className="col-md-6  bodr_lft">
				<div className="star_border ">
					<label>
						<T>common.company_ratings.overall</T>
					</label>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<StarRatings
						rating={
							props.company.avgStarRatings.overallSatisfaction
						}
						starDimension="25px"
						starSpacing="2px"
					/>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<label id="overAllText">
						{props.company.avgStarRatings.overallSatisfaction.toFixed(
							numDigits
						)}
					</label>
				</div>
				<br />
				<div className="tab_str">
					<table>
						<tbody>
							<tr>
								<td>
									<label
										htmlFor="input-2"
										className="control-label  lef_label"
									>
										<T>
											common.company_ratings.health_safety
										</T>
									</label>
								</td>
								<td>
									{/* star ratings are left */}
									<div className="row">
										<StarRatings
											rating={
												props.company.avgStarRatings
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
										<T>common.company_ratings.work_env</T>
									</label>
								</td>
								<td>
									<div className="row">
										<StarRatings
											rating={
												props.company.avgStarRatings
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
										<T>common.company_ratings.benefits</T>
									</label>
								</td>
								<td>
									<div className="row">
										<StarRatings
											rating={
												props.company.avgStarRatings
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
										<T>
											common.company_ratings.manager_relation
										</T>
									</label>
								</td>
								<td>
									<div className="row">
										<StarRatings
											rating={
												props.company.avgStarRatings
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
			</div>
			<div className="col-md-6  ">
				<center>
					{" "}
					<h3>
						{" "}
						<T>common.company_ratings.recommend</T>{" "}
					</h3>
				</center>

				<br />

				<div
					style={{
						width: "50%",
						height: "50%",
						margin: "0 auto",
					}}
				>
					<ChangingProgressbar
						percentages={[
							Math.round(props.company.percentRecommended * 100),
						]}
						strokeWidth={10}
						initialAnimation
					/>
				</div>
				<center>
					<div className="col-md-6">
						<div className="num_sett">
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
								<T>common.company_ratings.average_num</T>{" "}
								<T>common.company_ratings.months_worked</T>
							</span>
						</div>
					</div>
				</center>
			</div>
			<div className="clear" />
		</div>
	);
}

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
