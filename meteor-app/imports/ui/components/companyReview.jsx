import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckSquare,
	faTimesCircle,
	faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import ModalView from "/imports/ui/components/modals/modal-view.jsx";
import FlagSystem from "/imports/ui/components/flag/flag.jsx";

import VoteButtons from "./vote-buttons";

const T = i18n.createComponent();

function ReviewComponent(props) {
	// IF-ELSE for the Recommended option, green tick v/s red cross
	let className;
	if (props.review.wouldRecommendToOtherJobSeekers) {
		className = (
			<p style={{ color: "#2E8B57" }}>
				<FontAwesomeIcon
					icon={faCheckSquare}
					style={{ color: "#2E8B57" }}
				/>
				&nbsp;&nbsp;
				<T>common.companyreview.recommend</T>
			</p>
		);
	} else {
		className = (
			<p style={{ color: "#FF4545" }}>
				<FontAwesomeIcon
					icon={faTimesCircle}
					style={{ color: "#FF4545" }}
				/>
				&nbsp;&nbsp;
				<T>common.companyreview.not_recommend</T>
			</p>
		);
	}

	const datePosted = new Date(props.review.created).toLocaleDateString(
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
							&nbsp;&nbsp;-{" "}
							<strong>{props.review.jobTitle}</strong>
						</span>
					</p>
					<h2 className="head-rev-con">{props.review.title}</h2>

					<div className="btn-group show-on-hover">
						<a
							type="button"
							className="btn btn-default dropdown-toggle  btbn"
							data-toggle="dropdown"
						>
							<StarRatings
								rating={
									(props.review.starRatings.healthAndSafety +
										props.review.starRatings
											.managerRelationship +
										props.review.starRatings
											.workEnvironment +
										props.review.starRatings.benefits) /
									4
								} // the average rating of all 5 ratings
								starDimension="15px"
								starSpacing="1.5px"
							/>
							&nbsp;
							<FontAwesomeIcon icon={faCaretDown} />
						</a>
						<ul className="dropdown-menu" role="menu">
							<li>
								<label>
									<T>common.companyreview.overall</T>
								</label>
								<br />
								<StarRatings
									rating={
										props.review.starRatings
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
										props.review.starRatings.healthAndSafety
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
										props.review.starRatings.workEnvironment
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
									rating={props.review.starRatings.benefits}
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
										props.review.starRatings
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
							<p>{props.review.pros}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T>common.companyreview.cons</T>
							</label>
							<br />
							<p>{props.review.cons}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T>common.companyreview.additional_comments</T>
							</label>
							<br />
							<p>{props.review.additionalComments}</p>
						</div>
					</div>
					<div className="col-md-4 bn-col">
						<div className="float-right">
							<VoteButtons
								review={props.review}
								refetch={props.refetch}
							/>
						</div>
					</div>
					<br />
					<div className="float-right">
						<div className="flag-style">
							{/*
								Disable reporting when the user is not logged in.
								TODO: This should be refactored.
							*/}
							{props.user ? (
								<ModalView
									className="flag-style-btn"
									content={() => (
										<FlagSystem
											reviewId={props.review.id}
											companyName={props.companyName}
										/>
									)}
								>
									<T>common.companyreview.report</T>
								</ModalView>
							) : (
								<button className="flag-style-btn" disabled>
									<T>common.companyreview.report</T>
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="clear" />
			</div>
		</div>
	);
}

export default withTracker(props => ({
	...props,
	user: Meteor.user(),
}))(ReviewComponent);
