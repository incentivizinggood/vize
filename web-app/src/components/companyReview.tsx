import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckSquare,
	faTimesCircle,
	faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import PopupModal from "src/components/popup-modal";

import { withUser } from "src/hoc/user";
import FlagSystem from "src/components/flag/flag";
import { translations } from "src/translations";

import VoteButtons from "./vote-buttons";

const T = translations.legacyTranslationsNeedsRefactor;

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
				<T.companyreview.recommend />
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
				<T.companyreview.not_recommend />
			</p>
		);
	}

	const datePosted = new Date(props.review.created).toLocaleDateString(
		"es-MX",
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
									<T.companyreview.overall />
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
									<T.companyreview.health_safety />
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
									<T.companyreview.work_env />
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
									<T.companyreview.benefits />
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
									<T.companyreview.manager_relation />
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
								<T.companyreview.pros />
							</label>
							<br />
							<p>{props.review.pros}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T.companyreview.cons />
							</label>
							<br />
							<p>{props.review.cons}</p>
						</div>
						<br />
						<div className="form-group  p-c-a">
							<label>
								<T.companyreview.additional_comments />
							</label>
							<br />
							<p>{props.review.additionalComments}</p>
						</div>
					</div>
					<div className="col-md-4 bn-col">
						<div className="float-right">
							<VoteButtons review={props.review} />
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
								<T.companyreview.report
									renderer={t => (
										<PopupModal
											buttonClass="flag-style-btn"
											buttonText={t}
										>
											<FlagSystem
												reviewId={props.review.id}
												companyName={props.companyName}
											/>
										</PopupModal>
									)}
								/>
							) : (
								<button className="flag-style-btn" disabled>
									<T.companyreview.report />
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

export default withUser(ReviewComponent);
