import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import rewardsEligibility from "./rewards-eligibility.graphql";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

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

export default class RewardsComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			phoneNumber: "",
			phoneError: "",
			paymentMethod: "",
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.setPaymentMethod = this.setPaymentMethod.bind(this);
		this.mutationError = this.mutationError.bind(this);
		this.mutationCompleted = this.mutationCompleted.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		console.log("closing");
		this.setState({ modalIsOpen: false });
	}

	setPaymentMethod(methodName) {
		this.setState({ paymentMethod: methodName });
		this.openModal();
	}

	mutationError(error, message) {
		if (error.message == "GraphQL error: ALREADY_CLAIMED") {
			this.setState({ phoneError: t("rewardAlreadyClaimed") });
		} else {
			// using else is a temporary fix because currently graphQL is not returning the
			// correct error for when a phone number has alrady been used
			this.setState({ phoneError: t("phoneNumberUsed") });
		}
	}

	mutationCompleted(data) {
		if (data.claimWroteAReview === "CLAIMED") {
			this.closeModal();
			this.props.action();
		}
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
				height: "300px",
			},
		};

		return (
			<div>
				<div className="congratulations">
					<div className="congratulations-gif" />
					<p className="rewarded">
						<T>earnedReward</T>
					</p>
				</div>

				<div className="col-md-12">
					<div>
						<p>
							<T>rewardYou</T>
						</p>
						<p>
							<T>rewardOptions</T>
						</p>
						<div className="rewards">
							<div className="reward">
								<div className="reward-visual">
									<img
										src="images/payPal.png"
										alt="payPal logo"
									/>
									<p className="price-tag">$5</p>
								</div>
								<p>
									<T>paypalCash</T>
								</p>
								<a
									onClick={() => {
										this.setPaymentMethod("PAYPAL");
									}}
								>
									<T>getReward</T>
								</a>
							</div>
						</div>
					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					ariaHideApp={false}
					style={customStyles}
				>
					<Mutation
						onError={this.mutationError}
						onSuccess={this.mutationSuccess}
						onCompleted={this.mutationCompleted}
						mutation={REWARD_DATA_SUBMISSION}
					>
						{(claimWroteAReview, data) => (
							<form onSubmit={this.handelPhoneSubmitting}>
								<fieldset>
									<legend>
										<T>enterPhone</T>
									</legend>
									<label htmlFor="phone-number" />
									<PhoneInput
										placeholder="644 533 9876"
										countries={["MX"]}
										error={this.state.phoneError}
										international={false}
										value={this.state.phoneNumber}
										onChange={phoneNumber => {
											this.setState({ phoneNumber });

											if (
												this.state.phoneNumber &&
												isValidPhoneNumber(
													this.state.phoneNumber
												)
											) {
												this.state.phoneError = "";
											}
										}}
									/>
									<label
										className="heard-about-us-label"
										htmlFor="how-did-you-hear-about-us-select"
									>
										How did you hear about us?
									</label>
									<select
										id="how-did-you-hear-about-us-select"
										name="how-did-you-hear-about-us-select"
									>
										<option value="">
											--Please choose an option--
										</option>
										<option value="Radio">Radio</option>
										<option value="facebook">
											facebook
										</option>
										<option value="Google">Google</option>
										<option value="Referral">
											Referral
										</option>
										<option value="other">other</option>
									</select>
									<br />

									<button
										className="btn btn-primary"
										disabled={
											!(
												this.state.phoneNumber &&
												isValidPhoneNumber(
													this.state.phoneNumber
												)
											)
										}
										type="submit"
										style={{ float: "right" }}
										onClick={e => {
											e.preventDefault();

											console.log(data);
											claimWroteAReview({
												variables: {
													phoneNumber: this.state
														.phoneNumber,
													paymentMethod: this.state
														.paymentMethod,
												},
											});
										}}
									>
										<T>submit</T>
									</button>
								</fieldset>
							</form>
						)}
					</Mutation>
				</Modal>
			</div>
		);
	}
}
/*
<div className="reward">
	<div className="reward-visual">
		<img
			src="images/xoom.png"
			alt="xoom logo"
		/>
		<p className="price-tag">$5</p>
	</div>
	<p>
		<T>minutesReward</T>
	</p>
	<a onClick={this.setPaymentMethodXoom}>
		<T>getReward</T>
	</a>
</div>
*/
