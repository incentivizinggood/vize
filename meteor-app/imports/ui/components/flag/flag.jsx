import React from "react";
import styled from "styled-components";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.flags");
const T = i18n.createComponent();

const FlagTitle = styled.h2`
	color: #439bd5;
	font-weight: 500;
	margin: 3px;
`;

const LinePadding = styled.hr`
	margin-top: 1px;
	color: blue;
`;

const Reason = styled.div`
	margin-top: -10px;
	margin-left: 5px;
	margin-right: 5px;
	color: red;
`;

const TextArea = styled.div`
	margin-left: 5px;
	margin-right: 5px;
	margin-top: 8px;
`;

const ButtonSlide = styled.div`
	float: right;
	margin-right: 5px;
	margin-top: 7px;
`;

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
				<FlagTitle>
					{" "}
					<T>common.flags.report_review</T>{" "}
				</FlagTitle>
				<LinePadding />
				<Reason>
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
				</Reason>
				<TextArea>
					<textarea
						id="textAreaClear"
						rows="2"
						cols="200"
						placeholder={t("explanation")}
						className="form-control shadow-textarea z-depth-1"
						value={explanation}
						onChange={handleExplanationChange}
					/>
				</TextArea>
			</form>
			<ButtonSlide>
				<button
					type="submit"
					className="btn btn-primary"
					form="submitForm"
					value="Submit"
				>
					{" "}
					{t("submit")}
				</button>
			</ButtonSlide>
		</div>
	);
}

export default FlagSystem;
