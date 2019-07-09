import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { i18n } from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import PageWrapper from "imports/ui/components/page-wrapper";
import { RewardsEligibilityComponent } from "imports/gen/graphql-operations";

import RewardsComponent from "./rewardsComponent";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

function changeReviewStatusState(): void {
	// reload the page when a phone number is successfully inputed to claim a Reward
	// this is done because the reward status query does not get update until the
	// page is refreshed
	window.location.reload();
}

interface ReviewSubmittedProps {
	user?: Meteor.User;
}

function ReviewSubmitted(props: ReviewSubmittedProps): JSX.Element {
	let content = null;

	if (props.user) {
		content = (
			<div className="col-md-12">
				<h2 className="text-center">
					<T>contributing</T>
				</h2>
				<p>
					<T>reviewSubmitted</T>
				</p>

				<RewardsEligibilityComponent>
					{({ loading, error, data }) => {
						if (data) {
							if (data.wroteAReview === "CAN_CLAIM") {
								return (
									<RewardsComponent
										action={changeReviewStatusState}
									/>
								);
							}
						}
						return <p />;
					}}
				</RewardsEligibilityComponent>
			</div>
		);
	} else {
		content = (
			<div style={{ width: "80%", margin: "0 auto" }}>
				<br />
				<h3>You must be logged in to use this page. </h3>
				<br />
				<Link className="btn btn-primary" to="/login">
					Log In
				</Link>
				<br />
			</div>
		);
	}

	return (
		<PageWrapper title="Rewards">
			<section className="review-submitted">
				<div className="container back_top_hover">{content}</div>
			</section>
		</PageWrapper>
	);
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(ReviewSubmitted);
