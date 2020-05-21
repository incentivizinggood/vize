import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const BackToResourcesHeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	position: relative;

	height: 40px;
	max-width: 500px;
	padding-left: 20px;
	margin: 1px auto;

	background-color: white;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	> * {
		margin: auto 0;
		> * {
			margin: auto 0;
		}
	}
`;

const HeaderTitle = styled.h4`
	display: flex;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

const ArrowBackIconStyled = styled(ArrowBackIcon)`
	font-size: 25px !important;
	vertical-align: middle;
	color: black;
`;

type BackToResourcesHeaderProps = {
	topicName: string;
};

function BackToResourcesHeader({ topicName }: BackToResourcesHeaderProps) {
	return (
		<BackToResourcesHeaderContainer>
			<Link to="/recursos">
				<ArrowBackIconStyled />
			</Link>
			<HeaderTitle> {topicName} </HeaderTitle>
		</BackToResourcesHeaderContainer>
	);
}

export default BackToResourcesHeader;
