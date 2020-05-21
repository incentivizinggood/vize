import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { SectionTitle, Articles, Topics } from "../components";
import ArticleContactSection from "./article-contact";
import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

import articlePageQuery from "./article.graphql";
import articleAuthorQuery from "./article-author.graphql";
import { PanelContainer, Panel } from "imports/ui/components/panel";

const ArticleSubtitle = styled.h4`
	color: rgba(0, 0, 0, 0.54);
	margin: 5px auto;
`;

const AuthorName = styled.h5`
	color: black;
	margin: 5px auto;
	margin-top: 20px;
`;

const ArticlePublishedDate = styled.h6`
	color: rgba(0, 0, 0, 0.54);
	margin: 5px auto;
`;

const ArticleImage = styled.img`
	width: 100vw;
	margin: 0 -20px;
	margin-bottom: 30px;
`;

const BackToResourcesHeader = styled.div`
	display: flex;
	flex-direction: row;

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

const ArrowBackIconStyled = styled(ArrowBackIcon)`
	font-size: 25px !important;
	vertical-align: middle;
`;

const ArticleFooter = styled.div`
	display: flex;
	flex-direction: row;

	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 1;

	height: 45px;
	max-width: 500px;
	padding: 0 15px;
	margin: 0 auto;

	background-color: white;
	box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.12);

	> * {
		margin: auto 0;
		margin-left: 5px;
	}
`;

const NumLikes = styled.p`
	margin-left: 0;
	margin-right: 7px;
`;

const SectionLineSeparateor = styled.hr`
	width: 100vw;
	margin: 20px -20px;
`;

const SocialShareButtons = styled.div`
	display: flex;
	flex-direction: row-reverse;
	width: 100%;

	> * {
		margin: auto 0;
		margin-right: 5px;
	}
`;

type ArticleProps = {
	article: {
		slug: string;
		title: string;
		subtitle: string;
		body: string;
		articleImageURL: string;
		topicName: string;
		authorId: string;
		publishDate: string;
	};
};

function Article(props: ArticleProps) {
	const dateOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	let articlePublishedDate = new Date(
		props.article.publishDate
	).toLocaleDateString("es-MX", dateOptions);

	const { loading, error, data: authorData } = useQuery(articleAuthorQuery, {
		variables: { id: props.article.authorId },
	});

	console.log({ loading, error, authorData });

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	// Display either the author name or the company name of the author
	const AuthorTitleName = () => {
		if (authorData.articleAuthor.authorName) {
			return (
				<AuthorName>{authorData.articleAuthor.authorName}</AuthorName>
			);
		} else {
			return (
				<AuthorName>
					{authorData.articleAuthor.authorCompanyName}
				</AuthorName>
			);
		}
	};

	return (
		<>
			<BackToResourcesHeader>
				<Link to="/recursos">
					<ArrowBackIconStyled />
				</Link>
			</BackToResourcesHeader>
			<Panel>
				<h2>{props.article.title}</h2>

				<ArticleSubtitle>{props.article.subtitle}</ArticleSubtitle>

				<AuthorTitleName />

				<ArticlePublishedDate>
					{articlePublishedDate}
				</ArticlePublishedDate>

				<ArticleImage src={props.article.articleImageURL} />

				<ReactMarkdown source={props.article.body} />

				<SectionLineSeparateor />

				<ArticleContactSection author={authorData.articleAuthor} />
			</Panel>

			<ArticleFooter>
				<button>
					<FavoriteBorderIcon />
				</button>
				<NumLikes>0</NumLikes>

				<SocialShareButtons>
					<WhatsappShareButton
						url="http://localhost:3000/article"
						title="Hello"
					>
						<WhatsappIcon size="24" round={true} />
					</WhatsappShareButton>

					<FacebookShareButton
						url="http://localhost:3000/article"
						quote="Hello"
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size="24" round={true} />
					</FacebookShareButton>
				</SocialShareButtons>
			</ArticleFooter>
		</>
	);
}

function ArticlePage(props) {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);

	const slug = props.match.params.slug;

	// Gets data for the article, topics, and recent articles
	const { loading, error, data } = useQuery(articlePageQuery, {
		variables: { id: slug, currentPageNum },
	});

	console.log({ loading, error, data });

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	return (
		<>
			<PageWrapper title={data.article.title}>
				<PanelContainer>
					<Article article={data.article} />

					<SectionTitle>Topics</SectionTitle>
					<Topics topics={data.articleTopics} />

					<SectionTitle>Recent</SectionTitle>
					<Articles articles={data.searchRecentArticles.nodes} />
				</PanelContainer>
			</PageWrapper>
		</>
	);
}

export default withRouter(ArticlePage);
