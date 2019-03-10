import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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
	constructor() {
		super();

		this.state = {
			phoneNumber: "",
			phoneError: "",
			paymentMethod: "",
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handelPhoneSubmitting = this.handelPhoneSubmitting.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.setPaymentMethodPaypal = this.setPaymentMethodPaypal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		if (
			this.state.phoneNumber &&
			isValidPhoneNumber(this.state.phoneNumber)
		) {
			this.setState({ modalIsOpen: false });
		} else {
			this.state.phoneError = "Invalid Phone";
		}
	}

	setPaymentMethodPaypal() {
		this.setState({ paymentMethod: "PAYPAL" });
		this.openModal();
	}

	setPaymentMethodXoom() {
		this.setState({ paymentMethod: "XOOM" });
		this.openModal();
	}

	handelPhoneSubmitting(e) {
		console.log("ssuuubb");
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

		if (
			this.state.phoneNumber &&
			isValidPhoneNumber(this.state.phoneNumber)
		) {
			this.state.phoneError = "";
		}

		// const phoneNum = "9567484856";
		const phoneNum = "+529767484857";
		const paymentM = "PAYPAL";
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
								<a onClick={this.setPaymentMethodPaypal}>
									<T>getReward</T>
								</a>
							</div>
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
					<Mutation mutation={REWARD_DATA_SUBMISSION}>
						{(claimWroteAReview, data) => (
							<form onSubmit={this.handelPhoneSubmitting}>
								<fieldset>
									<legend>
										<T>enterPhone</T>
									</legend>
									<label htmlFor="phone-number" />
									<PhoneInput
										placeholder="Enter phone number"
										countries={["MX"]}
										error={this.state.phoneError}
										international={false}
										value={this.state.phoneNumber}
										onChange={phoneNumber =>
											this.setState({ phoneNumber })
										}
									/>

									<br />

									<button
										className="btn btn-primary"
										type="submit"
										style={{ float: "right" }}
										onClick={e => {
											e.preventDefault();

											console.log(data);
											claimWroteAReview({
												variables: {
													phoneNumber: phoneNum,
													paymentMethod: paymentM,
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
<input
	type="tel"
	id="phone-number"
	value={phoneNumber}
	onChange={this.handlePhoneChange}
	placeholder="(541)754-3010"
	required
/>

<input type="submit" value={t("submit")} />
*/
