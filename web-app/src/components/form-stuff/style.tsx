import React from "react";
import styled from "styled-components";

const PostElementContainer = styled.div`
	// padding: 30px;
`;
const MinimunEducationWrapper = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #dcdcdc;
	background-color: #f0f8ff;
	padding: 20px 15px;
	border-radius: 10px;
	.saperator {
		float: left;
		height: 120px;
		margin: 0 2%;
		width: 1px;
		background-color: #dcdcdc;
	}
`;

export { PostElementContainer, MinimunEducationWrapper };
