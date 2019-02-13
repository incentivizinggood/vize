import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
import { Query } from "react-apollo";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";
import RewardsComponent from "/imports/ui/components/rewardsComponent.jsx";

import rewardsEligibility from "./rewards-eligibility.graphql";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

Modal.setAppElement("body");

const Reward = () => (
	<Query query={rewardsEligibility}>
		{({ loading, error, data }) => {
			if (data.wroteAReview === "CAN_CLAIM") {
				return <RewardsComponent />;
			} else {
				return <p>hi</p>;
			}
		}}
	</Query>
);

export default class ReviewSubmitted extends React.Component {
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
		return (
			<div className="padding-fix">
				<div className="navbarwhite">
					<Header />
				</div>

				<section className="review-submitted">
					<div className="container back_top_hover">
						<div className="col-md-12">
							<h2 className="text-center">
								<T>contributing</T>
							</h2>
							<p>
								<T>reviewSubmitted</T>
							</p>
						</div>

						<Reward />
					</div>
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
