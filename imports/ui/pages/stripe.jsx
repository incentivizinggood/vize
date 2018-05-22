import React from "react";
import { Meteor } from "meteor/meteor";
import "../../api/data/methods.js";
import { Email } from "meteor/email";
import { Accounts } from "meteor/accounts-base";

/* The page where users write/edit their reviews.
 */

export default class FlagSystem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			value: "",
			count: 0,
		};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleStripe = this.handleStripe.bind(this);
	}

	handleSubmit(event) {
		alert(`${"sent1" + ": "}${this.state.value}`);
		alert(`${"sent2" + ": "}${this.state.name}`);
		alert("wassup");
		event.preventDefault();
	}

	handleOptionChange(event) {
		// alert("ground");
		// this.setState({value: event.target.value});
		this.setState({ name: event.target.value });
	}
	handleTextChange(event) {
		// alert("ground");
		this.setState({ value: event.target.value });

		// this.setState({selectedOption: event.target.selectedOption});
	}

	handleStripe(event) {
		event.preventDefault();
		console.log("Entered");
		alert("Graduation 2018");

		StripeCheckout.open({
			key: "pk_test_W1aQUfy86DOiwdVF5eSApBqE",
			amount: 5000, // this is equivalent to $50
			name: "Vize",
			description: "Secure payments",
			panelLabel: "Pay Now",
			token(res) {
				stripeToken = res.id;
				console.info(res);
				Meteor.call("chargeCard", stripeToken);
			},
		});

		console.log("Finished");
	}

	render() {
		return (
			<div>
				<h1>
					{" "}
					Stripe <span>&#9872;</span>{" "}
				</h1>

				<br />
				<br />

				<button type="submit" onClick={this.handleStripe}>
					{" "}
					stripe payment{" "}
				</button>
			</div>
		);
	}
}
