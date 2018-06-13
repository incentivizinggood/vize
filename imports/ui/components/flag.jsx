import React from "react";
import { Meteor } from "meteor/meteor";
import "../../api/data/methods.js";
import Dialog from "./dialog-box.jsx";

import { Email } from "meteor/email";
import { Accounts } from "meteor/accounts-base";

/* The page where users write/edit their reviews.
   imports/ui/pages/dialog-box.jsx:22:20: Unexpected token (22:20)

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
	}

	handleSubmit(event) {
		alert(`${"sent1" + ": "}${this.state.value}`);
		alert(`${"sent2" + ": "}${this.state.name}`);

		Meteor.call(
			"sendEmail",
			"urelperfect@gmail.com",
			"postmaster@incentivizinggood.com",
			`Reports: ${this.state.value}`,
			`${"Howdy,\n\n" +
				"Invalid comment reported details: \n" +
				"Reason: "}${
				this.state.value
			}.\n\nSincerely,\n\n Vize Inc.\n\n`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					console.log(err);
					console.log("--- END error");
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
				}
			}
		);

		alert("wassup");
		event.preventDefault();
	}

	handleOptionChange(event) {
		// alert("ground");
		// this.setState({value: event.target.value});
		this.setState({ name: event.target.value });

		// this.setState({selectedOption: event.target.selectedOption});
		// alert('Submitted: ' + this.state.selectedOption);
		// event.preventDefault();
		// onChange={this.handleOptionChange}
		// this.setState({value: event.target.value});
	}
	handleTextChange(event) {
		// alert("ground");
		this.setState({ value: event.target.value });

		// this.setState({selectedOption: event.target.selectedOption});
	}
	countUp(event) {
		this.setState({
			count: this.state.count + 1,
		});
	}
	countDown(event) {
		this.setState({
			count: this.state.count - 1,
		});
	}

	render() {
		return (
			<div className="system flag">
				<h1>
					Flag system <span>&#9872;</span>{" "}
				</h1>
				<br />
				<br />
				<button onClick={this.countUp.bind(this)}> up </button>
				<button onClick={this.countDown.bind(this)}> down </button>
				<label> {`Counter: ${this.state.count}`}</label>
				<br />
				<br />
				<a href="#modal" className="modal-trigger">
					Push
				</a>
				<div className="modal" id="modal">
					<div className="modal__dialog">
						/* Section begins here */
						<section className="modal__content">
							<header className="modal__header">
								<h2 className="modal__title">Report comment</h2>
								<a href="#" className="modal__close">
									&times;
								</a>
							</header>

							<form onSubmit={this.handleSubmit} id="submitForm">
								<div className="radio">
									<label>
										<input
											type="radio"
											value="Inappropriate Comment"
											name="sexual content"
											onChange={this.handleOptionChange}
										/>
										Inappropriate Comment
									</label>
								</div>
								<div className="radio">
									<label>
										<input
											type="radio"
											value="Profanity"
											name="sexual content"
											onChange={this.handleOptionChange}
										/>
										Profanity
									</label>
								</div>
								<div className="radio">
									<label>
										<input
											type="radio"
											value="Other/Spam"
											name="sexual content"
											onChange={this.handleOptionChange}
										/>
										Other/Spam
									</label>
								</div>

								<div>
									<label>
										{" "}
										{`${"Please let us know why you picked" +
											": "}${this.state.name}`}
									</label>
									<textarea
										rows="4"
										cols="50"
										className="textBox-flag"
										placeholder="Thank you..."
										onChange={this.handleTextChange}
									/>
								</div>
							</form>

							<footer className="modal__footer">
								<button type="button" className="">
									Cancel
								</button>
								<button
									type="submit"
									className="done-button"
									form="submitForm"
									value="Submit"
								>
									SUBMIT
								</button>
							</footer>
						</section>
					</div>
				</div>
				// <Dialog />
			</div>
		);
	}
}
