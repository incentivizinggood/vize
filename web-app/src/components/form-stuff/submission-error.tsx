import React from "react";
import styled from "styled-components";

import colors from "src/colors";

const ErrorBox = styled.div`
	background: ${colors.error};
	color: ${colors.onError};
	width: 100%;
	margin-top: 30px;
	padding: 10px;
`;

const Pre = styled.pre`
	width: 100%;
	max-height: 300px;
	overflow: scroll;
`;

interface SubmissionErrorProps {
	error?: unknown;
}

function SubmissionError({ error }: SubmissionErrorProps) {
	console.log("err", error);
	if (error === null) {
		return null;
	}

	if (typeof error === "string" || error instanceof String) {
		return (
			<ErrorBox>
				<span style={{ fontWeight: "bold" }}>{error}</span>
			</ErrorBox>
		);
	}

	return (
		<ErrorBox>
			An unknown error occured while submitting this form:
			<Pre>{JSON.stringify(error, null, 4)}</Pre>
		</ErrorBox>
	);
}

export default SubmissionError;
