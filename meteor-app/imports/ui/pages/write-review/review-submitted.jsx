import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { MDBContainer, MDBAlert } from "mdbreact";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";
import RewardsComponent from "./rewardsComponent.jsx";
import rewardsEligibility from "./rewards-eligibility.graphql";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

Modal.setAppElement("body");

const Reward = () => (
	<Query query={rewardsEligibility}>
		{({ loading, error, data }) => {
			if (data) {
				if (data.wroteAReview === "CAN_CLAIM") {
					return <RewardsComponent />;
				}
			}
			return <p />;
		}}
	</Query>
);
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

class ReviewSubmitted extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			hasRegisteredPhone: false,
			phoneNumber: "",
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handelPhoneSubmitting = this.handelPhoneSubmitting.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
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

	renderContent() {
		return (
			<div className="col-md-12">
				<h2 className="text-center">
					<T>contributing</T>
				</h2>
				<p>
					<T>reviewSubmitted</T>
				</p>

				<Reward />
			</div>
		);
	}

	render() {
		const { hasRegisteredPhone, phoneNumber } = this.state;
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
				<Dialog />
				<Footer />
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					ariaHideApp={false}
					style={customStyles}
				>
					<form onSubmit={this.handelPhoneSubmitting}>
						<fieldset>
							<legend>
								<T>enterPhone</T>
							</legend>
							<label htmlFor="phone-number" />
							<input
								type="tel"
								id="phone-number"
								value={phoneNumber}
								onChange={this.handlePhoneChange}
								placeholder="(541)754-3010"
								required
							/>
							<input type="submit" value={t("submit")} />
						</fieldset>
					</form>
				</Modal>
			</div>
		);
	}
}
export default withTracker(() => ({
	user: Meteor.user(),
}))(ReviewSubmitted);
