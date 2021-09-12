import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor.flags;

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

const FLAG_REVIEW = gql`
	mutation FlagReview($input: FlagReviewInput!) {
		flagReview(input: $input) {
			success
		}
	}
`;

interface FlagSystemProps {
	reviewId: string;
}

function FlagSystem(props: FlagSystemProps) {
	const [explanation, setExplanation] = React.useState("");
	const [reason, setReason] = React.useState("");

	console.log(explanation, reason);

	const handleExplanationChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => setExplanation(event.target.value);

	const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setReason(event.target.value);

	const [flagReview] = useMutation(FLAG_REVIEW);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		flagReview({
			variables: {
				input: { reviewId: props.reviewId, reason, explanation },
			},
		});

		alert("thanks");
	};

	return (
		<div className="system flag">
			<form onSubmit={handleSubmit} id="submitForm">
				<FlagTitle>
					{" "}
					<T.report_review />{" "}
				</FlagTitle>
				<LinePadding />

				<Reason>
					<T
						renderer={(t) => (
							<select
								id="selectClear"
								className="form-control"
								value={reason}
								onChange={handleReasonChange}
							>
								<option selected>{t.choose_reason}</option>
								<option value="Inappropriate Comment">
									{t.in_comment}
								</option>
								<option value="False Information">
									{t.false}
								</option>
								<option value="Other">{t.other}</option>
							</select>
						)}
					/>
				</Reason>
				<TextArea>
					<T.explanation
						renderer={(t) => (
							<textarea
								id="textAreaClear"
								rows={2}
								cols={200}
								placeholder={t}
								className="form-control shadow-textarea z-depth-1"
								value={explanation}
								onChange={handleExplanationChange}
							/>
						)}
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
					<T.submit />
				</button>
			</ButtonSlide>
		</div>
	);
}

export default FlagSystem;
