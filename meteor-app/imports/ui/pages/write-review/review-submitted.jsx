import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
import { CSSTransitionGroup } from "react-transition-group";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

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
				width: "60%",
				height: "200px",
				maxWidth: "450px",
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
						</div>
						<CSSTransitionGroup
							transitionName="success"
							transitionEnterTimeout={1000}
							transitionLeaveTimeout={1000}
						>
							{hasRegisteredPhone && (
								<div className="success-widget">
									<h3>
										<T>phoneSuccess</T>
									</h3>
									<h3>
										<T>phoneSuccess2</T>
									</h3>
								</div>
							)}
						</CSSTransitionGroup>
						{!hasRegisteredPhone && (
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
						)}
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
/*<CSSTransitionGroup
	transitionName="success"
	transitionEnterTimeout={1000}
	transitionLeaveTimeout={1000}
>
	{hasRegisteredPhone && (
		<div className="success-widget">
			<h3>
				Your phone number was registered
				successfully
			</h3>
		</div>
	)}
</CSSTransitionGroup>*/
