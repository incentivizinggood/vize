import React from "react";

import { Meteor } from "meteor/meteor";

import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

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
						<T.aboutUs.reach_us />
					</span>
					<div className="wrap-input rs1 validate-input">
						<T.aboutUs.placeholder_name
							renderer={t => (
								<input
									id="first-name"
									className="input"
									type="text"
									name="first-name"
									placeholder={t}
									onChange={this.handleNameChange}
								/>
							)}
						/>
						<span className="focus-input" />
					</div>
					<div className="wrap-input rs1 validate-input">
						<T.aboutUs.placeholder_email
							renderer={t => (
								<input
									id="email"
									className="input"
									type="text"
									name="email"
									placeholder={t}
									onChange={this.handleEmailChange}
								/>
							)}
						/>
						<span className="focus-input" />
					</div>
					<div className="wrap-input validate-input">
						<T.aboutUs.placeholder_comments
							renderer={t => (
								<textarea
									id="message"
									className="input"
									name="message"
									placeholder={t}
									onChange={this.handleTextBoxChanging}
								/>
							)}
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
								<T.aboutUs.submit_button />
								<i className="zmdi zmdi-arrow-right m-l-8" />
							</span>
						</button>
					</div>
				</form>
			</div>
		);
	}
}
export default ContactForm;
