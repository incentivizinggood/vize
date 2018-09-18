import React from "react";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import Dialog from "/imports/ui/components/dialog-box";

/* A page where visitors can get information about Vize and this app.
 */

const T = i18n.createComponent();

export default class AboutPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			value: "",
			textBox: "",
			emailSending: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleTextBoxChanging = this.handleTextBoxChanging.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleSubmit(event) {
		// alert("Called: " + this.state.name + " Email: " + this.state.emailSending  + " TextBox: " + this.state.textBox);

		Meteor.call(
			"sendEmail",
			"incentivizinggood@gmail.com",
			"postmaster@incentivizinggood.com",
			`Contacting us: ${this.state.name}`,
			`${"Howdy Vize reader,\n" + "Below is the message: \n"}${
				this.state.textBox
			}.\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: ${
				this.state.emailSending
			}`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					alert("Please try again");
					console.log(err);
					console.log("--- END error");
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
					alert("Thank you for the feedback!");
				}
			}
		);

		// alert("wassup");
		event.preventDefault();

		// clearing fields
		document.getElementById("first-name").value = null;
		document.getElementById("email").value = null;
		document.getElementById("message").value = null;
	}

	handleNameChange(event) {
		this.setState({ name: event.target.value });
	}
	handleEmailChange(event) {
		this.setState({ emailSending: event.target.value });
	}
	handleTextBoxChanging(event) {
		this.setState({ textBox: event.target.value });
	}

	render() {
		return (
			<div>
				<Header/>
				<div id="home" className="banner about-banner">
					<div className="banner-info">
						<div className="banner-text">
							<h1>
								<T>common.aboutUs.about</T>
							</h1>
						</div>
					</div>
				</div>

				<div className="about">
					<div className="container">
						<div className="col-md-12">
							<h1 className="al">
								<T>common.aboutUs.the_problem</T>
							</h1>
							<h3 className="emplh3">
								<T>common.aboutUs.noLeverage</T>
							</h3>
						</div>
						<div className="col-md-12 ">
							<div className="about-row">
								<p>
									<T>common.aboutUs.problem_text</T>
								</p>
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</div>

				<div className="about  bl">
					<div className="container">
						<div className="col-md-12  cdoun">
							<h1 className="al">
								<T>common.aboutUs.our_solution</T>
							</h1>

							<h3 className="emplh3">
								<T>common.aboutUs.reviews_accountability</T>
							</h3>
						</div>
						<div className="col-md-12 ">
							<div className="about-row">
								<p>
									<T>common.aboutUs.solution_text</T>{" "}
								</p>
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</div>

				<div className="cont about-cont">
					<div className="container">
						<div className="container-contact100">
							<div className="wrap-contact100">
								<form
									method="POST"
									className="contact100-form validate-form"
									onSubmit={this.handleSubmit}
									id="submitForm"
								>
									<span className="contact100-form-title">
										<T>common.aboutUs.reach_us</T>
									</span>
									<div className="wrap-input100 rs1 validate-input">
										<input
											id="first-name"
											className="input100"
											type="text"
											name="first-name"
											placeholder={i18n.__(
												"common.aboutUs.placeholder_name"
											)}
											onChange={this.handleNameChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100 rs1 validate-input">
										<input
											id="email"
											className="input100"
											type="text"
											name="email"
											placeholder={i18n.__(
												"common.aboutUs.placeholder_email"
											)}
											onChange={this.handleEmailChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100 validate-input">
										<textarea
											id="message"
											className="input100"
											name="message"
											placeholder={i18n.__(
												"common.aboutUs.placeholder_comments"
											)}
											onChange={
												this.handleTextBoxChanging
											}
										/>
										<span className="focus-input100" />
									</div>
									<div className="container-contact100-form-btn">
										<button
											className="contact100-form-btn"
											form="submitForm"
											value="Submit"
										>
											<span>
												<T>
													common.aboutUs.submit_button
												</T>
												<i className="zmdi zmdi-arrow-right m-l-8" />
											</span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<Dialog/>
				<Footer />
			</div>
		);
	}
}
