import React from "react";
import styled from "styled-components";

import { forSize } from "imports/ui/responsive.js";
import { urlGenerators } from "imports/ui/pages/url-generators";
import { translations } from "imports/ui/translations";
import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";
import ArrowRightIcon from "@material-ui/icons/ArrowRightAlt";

const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const articleDetailsPadding = "8px";
const footerHeight = "27px";

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

const RightArrowImage = styled.img`
	width: 80px;
	height: 30px;

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

const ArticleCategory = styled.h5`
	color: rgba(0, 0, 0, 0.54);
	line-height: 1.25;
	font-size: 1rem;
`;

/*
const ArticleDescription = styled.h5`
	margin-top: 5px;
	margin-bottom: 10px;
	color: black;
`;
*/

const ReadMore = styled.button`
	background-color: #e4e6eb;
	color: black;
	font-weight: bold;
	text-align: center;

	height: ${footerHeight};
	width: 85px;
	border-radius: 0.4rem;
`;

const ReadMoreButton = props => (
	<ReadMore primary to={urlGenerators.vizeRegister("company")} {...props}>
		Read More
	</ReadMore>
);

function ArticleCardComponent() {
	return (
		<TopicCard>
			<TopicCardContent>
				<TopicImage src="images/training-icon.png" />
				<br />
				<TopicName>Training</TopicName>

				{/*<ArticleDescription>
					Going back to school and getting a degree can be an enormous
					opportunity to increase your skill set as well as your
					wages, but many people don’t have the time or the money to
					finish an entire program.
				</ArticleDescription>
				*/}
				<ArrowRightIcon
					style={{ fontSize: "3.2rem" }}
					className="center-element"
				/>
			</TopicCardContent>
		</TopicCard>
	);
}

export default ArticleCardComponent;
