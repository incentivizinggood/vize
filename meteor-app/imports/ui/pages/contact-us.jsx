import React from "react";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { Meteor } from "meteor/meteor";
import Dialog from "/imports/ui/components/dialog-box";

/* A page where visitors can contact Vize for buisness inqueries.
 * Help and support contact may be handled here as well,
 * but users should be directed to the HelpPage first.
 */
export default class ContactUsPage extends React.Component {
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
					console.log(err);
					console.log("--- END error");
					alert("Please try again");
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
				<Header />
				<div id="home" className="banner static-page-banner">
					<div className="banner-info">
						<div className="banner-text">
							<h1>Contact us</h1>
						</div>
					</div>
				</div>
				<div className="cont about-cont">
					<div className="container">
						<div className="container-contact">
							<div className="wrap-contact">
								<form
									method="POST"
									className="contact-form validate-form"
									onSubmit={this.handleSubmit}
									id="submitForm"
								>
									<span className="contact-form-title">
										Feel free to reach out to us
									</span>
									<div className="wrap-input rs1 validate-input">
										<input
											id="first-name"
											className="input"
											type="text"
											name="first-name"
											placeholder="Your Name"
											onChange={this.handleNameChange}
										/>
										<span className="focus-input" />
									</div>
									<div className="wrap-input rs1 validate-input">
										<input
											id="email"
											className="input"
											type="text"
											name="email"
											placeholder="Eg. example@email.com"
											onChange={this.handleEmailChange}
										/>
										<span className="focus-input" />
									</div>
									<div className="wrap-input validate-input">
										<textarea
											id="message"
											className="input"
											name="message"
											placeholder="Please enter your comments..."
											onChange={
												this.handleTextBoxChanging
											}
										/>
										<span className="focus-input" />
									</div>
									<div className="container-contact-form-btn">
										<button
											className="contact-form-btn"
											form="submitForm"
											value="Submit"
										>
											<span>
												Submit
												<i className="zmdi zmdi-arrow-right m-l-8" />
											</span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<Footer />
				<Dialog />
			</div>
		);
	}
}
