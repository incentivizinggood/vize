import React from "react";
import StarRatings from "react-star-ratings";
import CircularProgressbar from "react-circular-progressbar";

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

export default class CompanyRating extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div className="col-md-6  bodr_lft">
					{/* getting an error here, apparently, this.props.companyrating gives me an object, but
            I am unable to get any of its fields. */}
					{/* <p>{console.log(this.props.companyrating.name)}</p>
            <p>{console.log(JSON.stringify(this.props.companyrating))}</p> */}

					<div className="star_boder ">
						<label>Overall</label>&nbsp;&nbsp;&nbsp;&nbsp;
						<StarRatings
							rating={
								Math.round(
									this.props.companyrating
										.overallSatisfaction * 100
								) / 100
							}
							starDimension="25px"
							starSpacing="2px"
						/>
						&nbsp;&nbsp; &nbsp;&nbsp;<label id="overAllText">
							{Math.round(
								this.props.companyrating.overallSatisfaction *
									100
							) / 100}
						</label>
					</div>
					<br />
					<div className="tab_str">
						<table className="table">
							<tbody>
								<tr>
									<td>
										<label
											htmlFor="input-2"
											className="control-label  lef_label"
										>
											Health & Safety
										</label>
									</td>
									<td>
										{/* star ratings are left */}
										<StarRatings
											rating={
												this.props.companyrating
													.healthAndSafety
											}
											starDimension="20px"
											starSpacing="1.8px"
										/>
										&nbsp;&nbsp;{" "}
										<label>
											{Math.round(
												this.props.companyrating
													.healthAndSafety * 100
											) / 100}
										</label>
									</td>
								</tr>
								<tr>
									<td>
										<label
											htmlFor="input-3"
											className="control-label   lef_label"
										>
											Work Environment
										</label>
									</td>
									<td>
										<StarRatings
											rating={
												this.props.companyrating
													.workEnvironment
											}
											starDimension="20px"
											starSpacing="1.8px"
										/>
										&nbsp;&nbsp;{" "}
										<label>
											{Math.round(
												this.props.companyrating
													.workEnvironment * 100
											) / 100}
										</label>
									</td>
								</tr>
								<tr>
									<td>
										<label
											htmlFor="input-4"
											className="control-label   lef_label"
										>
											Benefits
										</label>
									</td>
									<td>
										<StarRatings
											rating={
												this.props.companyrating
													.benefits
											}
											starDimension="20px"
											starSpacing="1.8px"
										/>
										&nbsp;&nbsp;{" "}
										<label>
											{Math.round(
												this.props.companyrating
													.benefits * 100
											) / 100}
										</label>
									</td>
								</tr>
								<tr>
									<td>
										{" "}
										<label
											htmlFor="input-5"
											className="control-label  lef_label"
										>
											Manager Relationships
										</label>
									</td>
									<td>
										<StarRatings
											rating={
												this.props.companyrating
													.managerRelationship
											}
											starDimension="20px"
											starSpacing="1.8px"
										/>
										&nbsp;&nbsp;{" "}
										<label>
											{Math.round(
												this.props.companyrating
													.managerRelationship * 100
											) / 100}
										</label>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-md-6  ">
					{/* <h4  className="head_section_font">Google Overview</h4> */}
					{/* <div  className="revw_tab1">
                <p>4,389 Reviews</p>
                </div> */}
					<center>
						{" "}
						<h3> Recommended </h3>
					</center>
					<br />
					{/* <div className="progress yellow"> */}

					{/* commented out the progress bars for now */}
					{/* <span className="progress-left">
                        <span className="progress-bar"></span>
                     </span>
                     <span className="progress-right" >
                        <span className="progress-bar"></span>
                     </span> */}

					{/* <div className="progress-value" >{(Math.round(this.props.companyrating.percentRecommended*100)/100)*100}%</div> */}

					<div
						style={{
							width: "50%",
							height: "50%",
							margin: "0 auto",
						}}
					>
						<ChangingProgressbar
							percentages={[
								Math.round(
									this.props.companyrating
										.percentRecommended * 100
								) /
									100 *
									100,
							]}
							strokeWidth={10}
							initialAnimation
						/>
					</div>
					<center>
						<div className="col-md-6">
							<div className="num_sett">
								<h1>
									{Math.round(
										this.props.companyrating
											.avgNumMonthsWorked * 100
									) / 100}{" "}
								</h1>
							</div>
						</div>
						<div className="col-md-6">
							<div className="num_sett">
								{" "}
								<span>
									Average number <br /> of months worked
								</span>
							</div>
						</div>
					</center>
				</div>
				<div className="clear" />
			</div>
		);
	}
}
