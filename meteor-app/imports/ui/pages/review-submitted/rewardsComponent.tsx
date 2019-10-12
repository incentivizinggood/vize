import React from "react";
import Popup from "reactjs-popup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const GetRewardButton = styled(Button)`
	font-weight: bold !important;
	font-size: 1.2rem !important;
	width: 100%;
	padding: 12px 36px !important;
`;

import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor.reviewSubmitted;
/*
.reward-button {
	font-weight: bold;
	padding: 15px;
	margin: 10px;
	border: 1px solid #d4d1d1;
	border-radius: 4px;
	display: block;
	&:hover {
		border: 1px solid rgba(0, 0, 0, 0.8);
		cursor: pointer;
	}
}

*/

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
		return (
			<div>
				<div className="congratulations">
					<div className="congratulations-gif" />
					<p className="rewarded">
						<T.earnedReward />
					</p>
				</div>

				<div className="col-md-12">
					<div>
						<p>
							<T.rewardYou />
						</p>
						<p>
							<T.rewardOptions />
						</p>
						<div className="rewards">
							<div className="reward">
								<div className="reward-visual">
									<a href="https://swap.mx/" target="_blank">
										<img
											src="images/swap-icon.png"
											alt="Swap Logo"
										/>
									</a>
								</div>
								<p>
									<T.swapCash />
								</p>
								<br />
								<GetRewardButton
									variant="contained"
									color="primary"
									onClick={() => {
										this.setPaymentMethod("SWAP");
									}}
								>
									<T.getReward />
								</GetRewardButton>
							</div>

							<div className="reward">
								<div className="reward-visual">
									<img
										src="images/payPal.png"
										alt="payPal logo"
									/>
								</div>
								<p>
									<T.paypalCash />
								</p>
								<br />
								<GetRewardButton
									variant="contained"
									color="primary"
									onClick={() => {
										this.setPaymentMethod("PAYPAL");
									}}
								>
									<T.getReward />
								</GetRewardButton>
							</div>
						</div>
					</div>
				</div>
				<Popup
					modal
					open={this.state.modalIsOpen}
					onClose={this.closeModal}
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
										<T.enterPhone />
									</legend>
									<label htmlFor="phone-number" />
									<PhoneInput
										placeholder="(664)___-____"
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
										<T.submit />
									</button>
								</fieldset>
							</form>
						)}
					</Mutation>
				</Popup>
			</div>
		);
	}
}
