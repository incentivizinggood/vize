import React from "react";
import styled from "styled-components";
import { boxShadow } from "src/global-styles";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const BackToResourcesHeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	position: relative;

	height: 40px;
	padding-left: 20px;
	margin: 1px auto;

	background-color: white;
	box-shadow: ${boxShadow.wide};

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
	// Remove last two directories of the path so that the correct resources page can be navigated to
	let backButtonURL = window.location.pathname;
	backButtonURL = backButtonURL.substring(0, backButtonURL.lastIndexOf("/"));
	backButtonURL = backButtonURL.substring(0, backButtonURL.lastIndexOf("/"));

	return (
		<BackToResourcesHeaderContainer>
			<Link to={backButtonURL} style={{ color: "black" }}>
				<ArrowBackIconStyled />
			</Link>
			<HeaderTitle> {topicName} </HeaderTitle>
		</BackToResourcesHeaderContainer>
	);
}

export default BackToResourcesHeader;
