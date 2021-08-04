import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckSquare,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import RatingsDropdown from "./ratings-dropdown";
import PopupModal from "src/components/popup-modal";
import { withUser } from "src/hoc/user";
import FlagSystem from "src/components/flag/flag";
import { translations } from "src/translations";
import VoteButtons from "src/components/vote-buttons";
import { CompanyProfileReviewFragment } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor;

interface ReviewComponentProps {
	review: CompanyProfileReviewFragment;
}

function ReviewComponent(props: ReviewComponentProps): JSX.Element {
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
		<div className="section_over_revi2">
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
					<RatingsDropdown ratings={props.review.starRatings} />
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
									renderer={(t) => (
										<PopupModal
											buttonClass="flag-style-btn"
											buttonText={t}
										>
											<FlagSystem
												reviewId={props.review.id}
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
