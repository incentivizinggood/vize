import React from "react";

import { Meteor } from "meteor/meteor";
import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

const T = i18n.createComponent();

class ContactForm extends React.Component {
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
			<div className="wrap-contact">
				<form
					method="POST"
					className="contact-form validate-form"
					onSubmit={this.handleSubmit}
					id="submitForm"
				>
					<span className="contact-form-title">
						<T>common.aboutUs.reach_us</T>
					</span>
					<div className="wrap-input rs1 validate-input">
						<input
							id="first-name"
							className="input"
							type="text"
							name="first-name"
							placeholder={i18n.__(
								"common.aboutUs.placeholder_name"
							)}
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
							placeholder={i18n.__(
								"common.aboutUs.placeholder_email"
							)}
							onChange={this.handleEmailChange}
						/>
						<span className="focus-input" />
					</div>
					<div className="wrap-input validate-input">
						<textarea
							id="message"
							className="input"
							name="message"
							placeholder={i18n.__(
								"common.aboutUs.placeholder_comments"
							)}
							onChange={this.handleTextBoxChanging}
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
								<T>common.aboutUs.submit_button</T>
								<i className="zmdi zmdi-arrow-right m-l-8" />
							</span>
						</button>
					</div>
				</form>
			</div>
		);
	}
}
export default withUpdateOnChangeLocale(ContactForm);
