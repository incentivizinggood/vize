import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { Accounts } from "meteor/accounts-base";
import style from "./flag.scss";

import "../../../api/data/methods.js";

/* The page where users write/edit their reviews.
   imports/ui/pages/dialog-box.jsx:22:20: Unexpected token (22:20)

 */

export default class FlagSystem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			value: "",
		};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleSubmit(event) {
		alert(`${"radio buttons:" + ": "}${this.state.value}`);
		alert(`${"desc:" + ": "}${this.state.name}`);

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
		this.setState({ name: event.target.value });
	}
	handleTextChange(event) {
		this.setState({ value: event.target.value });
	}

	render() {
		return (
			<div className="system flag">
				<form onSubmit={this.handleSubmit} id="submitForm">
					<h2 className={style.flagTitle}> Report review </h2>
					<hr className={style.linePadding} />
					<div className={style.reason}>
						<select
							className="form-control"
							onChange={this.handleTextChange}
						>
							<option selected disabled>
								Choose a Reason
							</option>
							<option value="Inappropriate Comment">
								Inappropriate Comment
							</option>
							<option value="False Information">
								False Information
							</option>
							<option value="audi">Other</option>
						</select>
					</div>
					<div className={style.textArea}>
						<textarea
							rows="2"
							cols="200"
							placeholder="Please provide a brief explanation"
							className="form-control shadow-textarea z-depth-1"
							onChange={this.handleTextChange}
						/>
					</div>
				</form>
				<div className={style.buttonSlide}>
					<button
						type="submit"
						className="btn btn-primary"
						form="submitForm"
						value="Submit"
					>
						{" "}
						SUBMIT
					</button>
				</div>
			</div>
		);
	}
}
