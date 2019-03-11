import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import rewardsEligibility from "./rewards-eligibility.graphql";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { MDBContainer, MDBAlert } from "mdbreact";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import RewardsComponent from "./rewardsComponent.jsx";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

Modal.setAppElement("body");

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

const Reward = () => (
	<Query query={rewardsEligibility}>
		{({ loading, error, data }) => {
			if (data) {
				console.log(data);
				// this.setState({ rewardStatus: "CLAIM" });
				if (data.wroteAReview === "CAN_CLAIM") {
					return (
						<RewardsComponent
							action={this.changeReviewStatusState}
						/>
					);
				}
			}
			return <RewardsComponent action={this.changeReviewStatusState} />;
		}}
	</Query>
);

class ReviewSubmitted extends React.Component {
	constructor(props) {
		super(props);

		this.changeReviewStatusState = this.changeReviewStatusState.bind(this);
		console.log("mamiii");
		this.state = {
			rewardStatus: "",
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handelPhoneSubmitting(e) {
		e.preventDefault();
		// here you can run validation and prevent submitting
		// and then save the phone number to the db
		this.closeModal();
		this.setState({ hasRegisteredPhone: true });
	}

	handlePhoneChange(event) {
		this.setState({ phoneNumber: event.target.value });
	}

	changeReviewStatusState() {
		console.log("checkeed");
		this.setState({ rewardStatus: "test" });
	}

	renderContent() {
		return (
			<div className="col-md-12">
				<h2 className="text-center">
					<T>contributing</T>
				</h2>
				<p>
					<T>reviewSubmitted</T>
				</p>

				<Query query={rewardsEligibility}>
					{({ loading, error, data }) => {
						if (data) {
							console.log(data);
							// this.setState({ rewardStatus: data.wroteAReview });
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
		console.log("user");
		console.log(this.props.user);
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
			<div className="padding-fix">
				<div className="navbarwhite">
					<Header />
				</div>

				<section className="review-submitted">
					<div className="container back_top_hover">{content}</div>
				</section>
				<Footer />
			</div>
		);
	}
}
export default withTracker(() => ({
	user: Meteor.user(),
}))(ReviewSubmitted);

/*
const Alert = ( function() {return (
	<div className="container alert-container">
		<div className="row">
			<div className="col-sm" />
			<div className="col-8">
				<MDBContainer>
					<MDBAlert color="success">
						<h4 className="alert-heading">
							<T>phoneSuccess</T>
						</h4>
						<p>
							<T>phoneSuccess2</T>
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
								<T>phoneSuccess</T>
							</h4>
							<p>
								<T>phoneSuccess2</T>
							</p>
						</MDBAlert>
					</MDBContainer>
				</div>
				<div className="col-sm" />
			</div>
		</div>
	);
); */
