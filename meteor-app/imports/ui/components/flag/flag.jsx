import React from "react";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import style from "./flag.scss";

const t = i18n.createTranslator("common.flags");
const T = i18n.createComponent();

function FlagSystem(props) {
	const [explanation, setExplanation] = React.useState("");
	const [reason, setReason] = React.useState("");

	console.log(explanation, reason);

	const handleExplanationChange = event => setExplanation(event.target.value);
	const handleReasonChange = event => setReason(event.target.value);

	const handleSubmit = event => {
		if (document.getElementById("textAreaClear").value === "") {
			alert(t("please_choose_reason"));
		} else {
			Meteor.call(
				"flagAReview",
				props.reviewId,
				reason,
				explanation,
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
	};

	return (
		<div className="system flag">
			<form onSubmit={handleSubmit} id="submitForm">
				<h2 className={style.flagTitle}>
					{" "}
					<T>common.flags.report_review</T>{" "}
				</h2>
				<hr className={style.linePadding} />
				<div className={style.reason}>
					<select
						id="selectClear"
						className="form-control"
						value={reason}
						onChange={handleReasonChange}
					>
						<option selected disabled>
							{t("choose_reason")}
						</option>
						<option value="Inappropriate Comment">
							{t("in_comment")}
						</option>
						<option value="False Information">{t("false")}</option>
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
						value={explanation}
						onChange={handleExplanationChange}
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
export default FlagSystem;
