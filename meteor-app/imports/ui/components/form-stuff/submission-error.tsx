import React from "react";
import styled from "styled-components";

const ErrorBox = styled.div`
	background: ${props => props.theme.error};
	color: ${props => props.theme.onError};
	width: 100%;
	margin-top: 30px;
	padding: 10px;
`;

const Pre = styled.pre`
	width: 100%;
	max-height: 300px;
	overflow: scroll;
`;

function SubmissionError({ error }) {
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
