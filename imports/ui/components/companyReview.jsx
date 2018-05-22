import React from "react";
import { Meteor } from "meteor/meteor";
import StarRatings from "react-star-ratings";
import VoteButtons from "./voteButtons.jsx";

export default class ReviewComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//@options -  For the date formatting
		var options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		//IF-ELSE for the Recommended option, green tick v/s red cross
		var className;
		if (this.props.item.wouldRecommendToOtherJobSeekers) {
			className = (
				<p style={{ color: "#2E8B57" }}>
					<i
						className="fa fa-check-square"
						style={{ color: "#2E8B57" }}
						aria-hidden="true"
					/>&nbsp;&nbsp;Recommended
				</p>
			);
		} else {
			className = (
				<p style={{ color: "#FF4545" }}>
					<i
						className="far fa-times-circle"
						style={{ color: "#FF4545" }}
						aria-hidden="true"
					/>&nbsp;&nbsp;Not Recommended
				</p>
			);
		}

		return (
			<div className="col-md-12  section_over_revi2 ">
				<div className="rev_section">
					<div className="mar_pad2">
						<p>
							{this.props.item.datePosted.toLocaleDateString(
								"en-US",
								options
							)}
							<span>
								&nbsp;&nbsp;-{" "}
								<strong>{this.props.item.jobTitle}</strong>
							</span>
						</p>
						<h2 className="head-rev-con">
							{this.props.item.reviewTitle}{" "}
						</h2>

						<div className="btn-group show-on-hover">
							<a
								type="button"
								className="btn btn-default dropdown-toggle  btbn"
								data-toggle="dropdown"
							>
								<StarRatings
									rating={
										(this.props.item.healthAndSafety +
											this.props.item
												.managerRelationship +
											this.props.item.workEnvironment +
											this.props.item.benefits) /
										4
									} //the average rating of all 5 ratings
									starDimension="15px"
									starSpacing="1.5px"
								/>
								&nbsp;<i className="fa fa-caret-down" />
							</a>
							<ul className="dropdown-menu" role="menu">
								<li>
									<label>Overall</label>
									<br />
									<StarRatings
										rating={
											this.props.item.overallSatisfaction
										}
										starDimension="15px"
										starSpacing="1.5px"
									/>
								</li>
								<li>
									<label>Health & Safety</label>
									<br />
									<StarRatings
										rating={this.props.item.healthAndSafety}
										starDimension="15px"
										starSpacing="1.5px"
									/>
								</li>
								<li>
									{" "}
									<label>Work Environment</label>
									<br />
									<StarRatings
										rating={this.props.item.workEnvironment}
										starDimension="15px"
										starSpacing="1.5px"
									/>
								</li>
								<li>
									<label>Benefits</label>
									<br />
									<StarRatings
										rating={this.props.item.benefits}
										starDimension="15px"
										starSpacing="1.5px"
									/>
								</li>
								<li>
									{" "}
									<label>Manager Relationships</label>
									<br />
									<StarRatings
										rating={
											this.props.item.managerRelationship
										}
										starDimension="15px"
										starSpacing="1.5px"
									/>
								</li>
							</ul>
						</div>

						<br />
						{/* // Does the IF-ELSE, and changes class to the ticked one if recommended
        //and to the crossed one, if not recommended. */}
						{className}
					</div>
					<div className="mar_pad">
						<div className="col-md-8">
							<div className="form-group  p-c-a">
								<br />
								<label>Pros</label>
								<br />
								<p>{this.props.item.pros}</p>
							</div>
							<br />
							<div className="form-group  p-c-a">
								<label>Cons</label>
								<br />
								<p>{this.props.item.cons}</p>
							</div>
							<br />
							<div className="form-group  p-c-a">
								<label>Additional Comments</label>
								<br />
								<p>{this.props.item.additionalComments}</p>
							</div>
						</div>
						<div className="col-md-4 bn-col">
							<div className="fl_ri">
								<VoteButtons
									review={this.props.item}
									userVotes={this.props.userVotes}
								/>
							</div>
						</div>
					</div>
					<div className="clear" />
				</div>
			</div>
		);
	}
}
