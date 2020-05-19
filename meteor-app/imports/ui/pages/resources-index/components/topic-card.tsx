import React from "react";
import styled from "styled-components";

import { urlGenerators } from "imports/ui/pages/url-generators";
import { translations } from "imports/ui/translations";

import ArrowRightIcon from "@material-ui/icons/ArrowRightAlt";
import styleVariables from "imports/ui/style-variables";

const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const articleDetailsPadding = "8px";

const TopicCard = styled.div`
	display: flex;
	width: 46%;
	margin-right: 2%
	margin-left: 2%
	margin-bottom: 10px;

	background-color: white;
	border-radius: 4px;
	height: 260px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const TopicCardContent = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: ${articleDetailsPadding};
`;

const TopicImage = styled.img`
	width: 130px;
	height: 130px;

	margin-left: auto;
	margin-right: auto;
	margin-top: 15px;
	padding: 10px;
`;

const TopicName = styled.h3`
	margin-bottom: 5px;
	font-weight: bold;
	text-align: center;
`;

type TopicCardProps = {
	topicIcon: string;
	topicName: string;
};

function TopicCardComponent(props: TopicCardProps) {
	return (
		<TopicCard>
			<TopicCardContent>
				<TopicImage src={props.topicIcon} />
				<br />
				<TopicName>{props.topicName}</TopicName>

				<ArrowRightIcon
					style={{ fontSize: "3.2rem" }}
					className="center-element"
				/>
			</TopicCardContent>
		</TopicCard>
	);
}

export default TopicCardComponent;
