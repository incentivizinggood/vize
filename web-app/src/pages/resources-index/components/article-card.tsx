import React from "react";
import styled from "styled-components";

import { urlGenerators } from "src/pages/url-generators";
import { translations } from "src/translations";
import { Link } from "react-router-dom";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.resources;

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
	object-fit: cover;
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

let ReadMore = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #e4e6eb;
	color: black;
	font-weight: bold;
	text-align: center;

	height: ${footerHeight};
	width: 85px;
	border-radius: 0.4rem;
`;

ReadMore = ReadMore.withComponent(Link);
const ReadMoreButton = props => (
	<ReadMore primary to={urlGenerators.vizeArticleUrl(props.slug)} {...props}>
		<T.read />
	</ReadMore>
);

type ArticleCardProps = {
	slug: string;
	title: string;
	topicName: string;
	articleImageURL: string;
};

function ArticleCardComponent(props: ArticleCardProps) {
	const domain = "www.vize.mx";
	return (
		<Link
			style={{ color: "black" }}
			to={urlGenerators.vizeArticleUrl(props.slug)}
			{...props}
		>
			<ArticleCard>
				<ArticleImage src={props.articleImageURL} />
				<ArticleDetails>
					<ArticleTitle>{props.title}</ArticleTitle>
					<ArticleCategory>{props.topicName}</ArticleCategory>
					<ArticleFooter>
						<ReadMoreButton slug={props.slug} />

						<WhatsappShareButton
							url={
								domain +
								urlGenerators.vizeArticleUrl(props.slug)
							}
							title="Hola, estoy leyendo este artículo y te lo recomiendo!"
						>
							<WhatsappIcon size={footerHeight} round={true} />
						</WhatsappShareButton>

						<FacebookShareButton
							url={
								domain +
								urlGenerators.vizeArticleUrl(props.slug)
							}
							quote="Hola, estoy leyendo este artículo y se los recomiendo!"
							hashtag="#incentivandoelbien"
						>
							<FacebookIcon size={footerHeight} round={true} />
						</FacebookShareButton>
					</ArticleFooter>
				</ArticleDetails>
			</ArticleCard>
		</Link>
	);
}

export default ArticleCardComponent;