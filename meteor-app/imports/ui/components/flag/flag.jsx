import React from "react";
import i18n from "meteor/universe:i18n";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { Accounts } from "meteor/accounts-base";
import style from "./flag.scss";
import "../../../api/data/methods.js";

const t = i18n.createTranslator("common.flags");
const T = i18n.createComponent();

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
		if (document.getElementById("textAreaClear").value === "") {
			alert(t("please_choose_reason"));
		} else {
			Meteor.call(
				"sendEmail",
				"postmaster@incentivizinggood.com",
				"incentivizinggood@gmail.com",
				`Reports: ${this.state.value}`,
				`${"Howdy,\n\n" + "Details: \n" + "Reason: "}${
					this.state.name
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

			document.getElementById("textAreaClear").value = "";
			alert(t("thanks"));
		}
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
					<h2 className={style.flagTitle}>
						{" "}
						<T>common.flags.report_review</T>{" "}
					</h2>
					<hr className={style.linePadding} />
					<div className={style.reason}>
						<select
							id="selectClear"
							className="form-control"
							onChange={this.handleTextChange}
						>
							<option selected disabled>
								{t("choose_reason")}
							</option>
							<option value="Inappropriate Comment">
								{t("in_comment")}
							</option>
							<option value="False Information">
								{t("false")}
							</option>
							<option value="Other">{t("other")}</option>
						</select>
					</div>
					<div className={style.textArea}>
						<textarea
							id="textAreaClear"
							rows="2"
							cols="200"
							placeholder={t("explanation")}
							className="form-control shadow-textarea z-depth-1"
							onChange={this.handleOptionChange}
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
						{t("submit")}
					</button>
				</div>
			</div>
		);
	}
}
