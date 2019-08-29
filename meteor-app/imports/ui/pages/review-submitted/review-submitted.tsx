import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { withUser } from "imports/ui/hoc/user";
import PageWrapper from "imports/ui/components/page-wrapper";
import { translations } from "imports/ui/translations";

import RewardsComponent from "./rewardsComponent";
import rewardsEligibility from "./rewards-eligibility.graphql";

const T = translations.legacyTranslationsNeedsRefactor.reviewSubmitted;

const REWARD_DATA_SUBMISSION = gql`
	mutation RewardDataSubmission(
		$phoneNumber: String!
		$paymentMethod: PaymentMethod!
	) {
		claimWroteAReview(
			phoneNumber: $phoneNumber
			paymentMethod: $paymentMethod
		)
	}
`;

class ReviewSubmitted extends React.Component {
	constructor(props) {
		super(props);

		this.changeReviewStatusState = this.changeReviewStatusState.bind(this);
	}

	changeReviewStatusState() {
		// reload the page when a phone number is successfully inputed to claim a Reward
		// this is done because the reward status query does not get update until the
		// page is refreshed
		window.location.reload();
	}

	renderContent() {
		return (
			<div className="col-md-12">
				<h2 className="text-center">
					<T.contributing />
				</h2>
				<p>
					<T.reviewSubmitted />
				</p>

				<Query query={rewardsEligibility}>
					{({ loading, error, data }) => {
						if (data) {
							if (data.wroteAReview === "CAN_CLAIM") {
								return (
									<RewardsComponent
										action={this.changeReviewStatusState}
									/>
								);
							}
						}
						return <p />;
					}}
				</Query>
			</div>
		);
	}

	render() {
		const customStyles = {
			content: {
				margin: "auto",
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				borderRadius: "4px",
			},
		};

		let content = null;

		if (this.props.user) {
			content = this.renderContent();
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
}
export default withUser(ReviewSubmitted);

/*
const Alert = ( function() {return (
	<div className="container alert-container">
		<div className="row">
			<div className="col-sm" />
			<div className="col-8">
				<MDBContainer>
					<MDBAlert color="success">
						<h4 className="alert-heading">
							<T.phoneSuccess/>
						</h4>
						<p>
							<T.phoneSuccess2/>
						</p>
					</MDBAlert>
				</MDBContainer>
			</div>
			<div className="col-sm" />
		</div>
	</div>
);}) ();
	return (
		<div className="container alert-container">
			<div className="row">
				<div className="col-sm" />
				<div className="col-8">
					<MDBContainer>
						<MDBAlert color="success">
							<h4 className="alert-heading">
								<T.phoneSuccess/>
							</h4>
							<p>
								<T.phoneSuccess2/>
							</p>
						</MDBAlert>
					</MDBContainer>
				</div>
				<div className="col-sm" />
			</div>
		</div>
	);
); */
