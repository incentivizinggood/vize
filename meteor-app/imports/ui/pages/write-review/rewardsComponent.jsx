import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

export default class RewardsComponent extends React.Component {
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
								<a onClick={this.openModal}>
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
								<a onClick={this.openModal}>
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
					<form onSubmit={this.handelPhoneSubmitting}>
						<fieldset>
							<legend>
								<T>enterPhone</T>
							</legend>
							<label htmlFor="phone-number" />
							<PhoneInput
								placeholder="Enter phone number"
								countries={["MX"]}
								international={false}
								value={this.state.phone}
								onChange={phone => this.setState({ phone })}
							/>

							<input type="submit" value={t("submit")} />
						</fieldset>
					</form>
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
/> */
