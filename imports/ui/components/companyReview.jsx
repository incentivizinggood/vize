import React from "react";
import StarRatings from "react-star-ratings";

import i18n from "meteor/universe:i18n";

import VoteButtons from "./voteButtons.jsx";

const T = i18n.createComponent();

function ReviewComponent(props) {
	// IF-ELSE for the Recommended option, green tick v/s red cross
	let className;
	if (props.item.wouldRecommendToOtherJobSeekers) {
		className = (
			<p style={{ color: "#2E8B57" }}>
				<i
					className="fa fa-check-square"
					style={{ color: "#2E8B57" }}
					aria-hidden="true"
				/>&nbsp;&nbsp;<T>common.companyreview.recommend</T>
			</p>
		);
	} else {
		className = (
			<p style={{ color: "#FF4545" }}>
				<i
					className="far fa-times-circle"
					style={{ color: "#FF4545" }}
					aria-hidden="true"
				/>&nbsp;&nbsp;<T>common.companyreview.not_recommend</T>
			</p>
		);
	}

	const datePosted = new Date(props.item.created).toLocaleDateString(
		"en-US",
		{
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}
	);

	return (
		<div className="col-md-12  section_over_revi2 ">
			<div className="rev_section">
				<div className="mar_pad2">
					<p>
						{datePosted}
						<span>
							&nbsp;&nbsp;- <strong>{props.item.jobTitle}</strong>
						</span>
					</p>
					<h2 className="head-rev-con">{props.item.reviewTitle} </h2>

					<div className="btn-group show-on-hover">
						<a
							type="button"
							className="btn btn-default dropdown-toggle  btbn"
							data-toggle="dropdown"
						>
							<StarRatings
								rating={
									(props.item.starRatings.healthAndSafety +
										props.item.starRatings
											.managerRelationship +
										props.item.starRatings.workEnvironment +
										props.item.starRatings.benefits) /
									4
								} // the average rating of all 5 ratings
								starDimension="15px"
								starSpacing="1.5px"
							/>
							&nbsp;<i className="fa fa-caret-down" />
						</a>
						<ul className="dropdown-menu" role="menu">
							<li>
								<label>
									<T>common.companyreview.overall</T>
								</label>
								<br />
								<StarRatings
									rating={
										props.item.starRatings
											.overallSatisfaction
									}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</li>
							<li>
								<label>
									<T>common.companyreview.health_safety</T>
								</label>
								<br />
								<StarRatings
									rating={
										props.item.starRatings.healthAndSafety
									}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</li>
							<li>
								{" "}
								<label>
									<T>common.companyreview.work_env</T>
								</label>
								<br />
								<StarRatings
									rating={
										props.item.starRatings.workEnvironment
									}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</li>
							<li>
								<label>
									<T>common.companyreview.benefits</T>
								</label>
								<br />
								<StarRatings
									rating={props.item.starRatings.benefits}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</li>
							<li>
								{" "}
								<label>
									<T>common.companyreview.manager_relation</T>
								</label>
								<br />
								<StarRatings
									rating={
										props.item.starRatings
											.managerRelationship
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
							<label>
								<T>common.companyreview.pros</T>
							</label>
							<br />
							<p>{props.item.pros}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T>common.companyreview.cons</T>
							</label>
							<br />
							<p>{props.item.cons}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T>common.companyreview.additional_comments</T>
							</label>
							<br />
							<p>{props.item.additionalComments}</p>
						</div>
					</div>
					<div className="col-md-4 bn-col">
						<div className="fl_ri">
							<VoteButtons review={props.item} />
						</div>
					</div>
				</div>
				<div className="clear" />
			</div>
		</div>
	);
}

export default ReviewComponent;
