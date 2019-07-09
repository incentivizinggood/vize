import React from "react";
import Popup from "reactjs-popup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { i18n } from "meteor/universe:i18n";

import { RewardDataSubmissionComponent } from "imports/gen/graphql-operations";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

export default class RewardsComponent extends React.Component {
	public constructor(props) {
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

	public openModal(): void {
		this.setState({ modalIsOpen: true });
	}

	public closeModal(): void {
		console.log("closing");
		this.setState({ modalIsOpen: false });
	}

	public setPaymentMethod(methodName): void {
		this.setState({ paymentMethod: methodName });
		this.openModal();
	}

	public mutationError(error, message): void {
		if (error.message == "GraphQL error: ALREADY_CLAIMED") {
			this.setState({ phoneError: t("rewardAlreadyClaimed") });
		} else {
			// using else is a temporary fix because currently graphQL is not returning the
			// correct error for when a phone number has alrady been used
			this.setState({ phoneError: t("phoneNumberUsed") });
		}
	}

	public mutationCompleted(data): void {
		if (data.claimWroteAReview === "CLAIMED") {
			this.closeModal();
			this.props.action();
		}
	}

	public render(): JSX.Element {
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
				<Popup
					modal
					open={this.state.modalIsOpen}
					onClose={this.closeModal}
				>
					<RewardDataSubmissionComponent
						onError={this.mutationError}
						onSuccess={this.mutationSuccess}
						onCompleted={this.mutationCompleted}
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
										{t("howDidYouHear")}
									</label>
									<select
										id="how-did-you-hear-about-us-select"
										name="how-did-you-hear-about-us-select"
									>
										<option value="">
											{t("selectOption")}
										</option>
										<option value="Radio">Radio</option>
										<option value="Facebook">
											Facebook
										</option>
										<option value="Google">Google</option>
										<option value="Referral">
											{t("Referral")}
										</option>
										<option value="InPerson">
											{t("inPerson")}
										</option>
										<option value="Other">
											{t("Other")}
										</option>
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
					</RewardDataSubmissionComponent>
				</Popup>
			</div>
		);
	}
}
