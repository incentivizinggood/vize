import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";
import { urlGenerators } from "imports/ui/pages/url-generators";

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

const RewardSection = styled.div`
	margin-top: 250px;
	margin-bottom: 250px;
	padding: 50px;
	background-color: #fefdfe;
	box-shadow: 0px 1px 3px 0px;
	width: 80%;
	display: flex;

	margin-right: auto;
	margin-left: auto;

	p {
		color: black;
		text-align: center;
	}

	h2 {
		font-weight: bold;
	}

	${forSize.phoneOnly} {
		width: 100%;
		margin-top: 70px;
		margin-bottom: 0px;
		padding: 30px 0px;
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
		let content = null; // 				<RewardSection>{content}</RewardSection>

		if (this.props.user) {
			content = this.renderContent();
		} else {
			content = (
				<div
					style={{
						width: "80%",
						margin: "0 auto",
						backgroundColor: "white",
					}}
				>
					<br />
					<h3>You must be logged in to use this page. </h3>
					<br />
					<Link
						className="btn btn-primary"
						to={urlGenerators.vizeLogin("worker")}
					>
						Log In
					</Link>
					<br />
				</div>
			);
		}

		return (
			<PageWrapper title="Rewards">
				<RewardSection>{content}</RewardSection>
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
