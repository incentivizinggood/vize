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

const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const articleDetailsPadding = "8px";
const footerHeight = "27px";

const ArticleCard = styled.div`
	display: flex;
	background-color: white;
	border-radius: 4px;
	margin: 10px;
	height: 125px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const ArticleDetails = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: ${articleDetailsPadding};
`;

const ArticleImage = styled.img`
	width: 110px;
	height: 110px;
	margin: auto;
	margin-left: 5px;
	border-radius: 4px;
`;

const ArticleTitle = styled.h4`
	margin-bottom: 5px;
	font-weight: bold;
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

// Contains Read More button and Whatsapp + Facebook share buttons
const ArticleFooter = styled.div`
	display: flex;
	position: absolute
	bottom: 0px;
	right: 0px;
	flex-direction: row-reverse;

	width: 100%;
	padding: ${articleDetailsPadding};

	> * {
		margin-right: 6px;
	}
`;

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
		<ArticleCard>
			<ArticleImage src="images/employerPostVize.jpg" />
			<ArticleDetails>
				<ArticleTitle>Training Programs at UABC</ArticleTitle>
				<ArticleCategory> Education </ArticleCategory>

				{/*<ArticleDescription>
					Going back to school and getting a degree can be an enormous
					opportunity to increase your skill set as well as your
					wages, but many people don’t have the time or the money to
					finish an entire program.
				</ArticleDescription>
				*/}
				<ArticleFooter>
					<ReadMoreButton />

					<WhatsappShareButton
						url="http://localhost:3000/article"
						title="Hello"
					>
						<WhatsappIcon size={footerHeight} round={true} />
					</WhatsappShareButton>

					<FacebookShareButton
						url="http://localhost:3000/article"
						quote="Hello"
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size={footerHeight} round={true} />
					</FacebookShareButton>
				</ArticleFooter>
			</ArticleDetails>
		</ArticleCard>
	);
}

export default ArticleCardComponent;
