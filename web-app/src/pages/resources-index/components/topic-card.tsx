import React from "react";
import styled from "styled-components";

import * as urlGenerators from "src/pages/url-generators";
import { Link } from "react-router-dom";
import { forSize } from "src/responsive";
import { borderRadius, boxShadow } from "src/global-styles";

import ArrowRightIcon from "@material-ui/icons/ArrowRightAlt";

const resourceDetailsPadding = "8px";

const TopicCard = styled.div`
	display: flex;
	width: 46%;
	margin-left: 2.5%;
	margin-bottom: 10px;

	background-color: white;
	border-radius: ${borderRadius.container};
	height: 260px;

	box-shadow: ${boxShadow.wide};

	${forSize.phoneOnly} {
		border-radius: ${borderRadius.containerMobile};
	}
`;

const TopicCardContent = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: ${resourceDetailsPadding};
`;

const TopicImage = styled.img`
	width: 130px;
	height: 130px;

	margin-left: auto;
	margin-right: auto;
	margin-bottom: 10px;
	padding: 10px;
`;

const TopicName = styled.h3`
	display: flex;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;
	text-align: center;
	height: 50px;
`;

const LinkRedirect = styled(Link)`
	margin: 0 auto;
	color: black;
`;

type TopicCardProps = {
	iconImageURL: string;
	topicName: string;
};

function TopicCardComponent(props: TopicCardProps) {
	return (
		<TopicCard>
			<LinkRedirect
				to={urlGenerators.vizeResourceTopicUrl(props.topicName)}
			>
				<TopicCardContent>
					<TopicImage src={props.iconImageURL} />
					<TopicName>{props.topicName}</TopicName>

					<LinkRedirect
						to={urlGenerators.vizeResourceTopicUrl(props.topicName)}
					>
						<ArrowRightIcon
							style={{ fontSize: "3.4rem" }}
							className="center-element"
						/>
					</LinkRedirect>
				</TopicCardContent>
			</LinkRedirect>
		</TopicCard>
	);
}

export default TopicCardComponent;
