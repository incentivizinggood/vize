import React from "react";
import styled from "styled-components";

import { forSize } from "imports/ui/responsive.js";
import { urlGenerators } from "imports/ui/pages/url-generators";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor.forEmployers;

const ArticleCard = styled.div`
	display: flex;
	background-color: white;
	border-radius: 4px;
	margin: 10px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const ArticleDetails = styled.div`
	display: flex;
	flex-direction: column;
	padding: 12px;
`;

const ArticleImage = styled.img`
	width: 130px;
	height: 130px;
`;

const ArticleTitle = styled.h4`
	margin-bottom: 5px;
	font-weight: bold;
`;

const ArticleDescription = styled.h5`
	margin-top: 5px;
	margin-bottom: 10px;
	color: black;
`;

const ReadMore = styled.button`
	margin-left: auto;
	background-color: #0d8dfb;
	color: white;
	font-weight: bold;
	text-align: center;
	height: 35px;
	width: 90px;
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
			<ArticleImage src="images/escudo-uabc.png" />
			<ArticleDetails>
				<ArticleTitle>Training Programs at UABC</ArticleTitle>

				<ArticleDescription>
					Going back to school and getting a degree can be an enormous
					opportunity to increase your skill set as well as your
					wages, but many people don’t have the time or the money to
					finish an entire program.
				</ArticleDescription>

				<ReadMoreButton />
			</ArticleDetails>
		</ArticleCard>
	);
}

export default ArticleCardComponent;
