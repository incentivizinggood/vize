import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery, useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { withUser } from "imports/ui/hoc/user";
import { ArticleAuthor } from "imports/api/models/types";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

import {
	SectionTitle,
	BackToResourcesHeader,
	Articles,
	Topics,
} from "../components";
import ArticleContactSection from "./article-contact";
import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";
import { forSize } from "imports/ui/responsive.js";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { urlGenerators } from "imports/ui/pages/url-generators";

import PopupModal from "imports/ui/components/popup-modal";
import RegisterLoginModal from "imports/ui/components/register-login-modal";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

import articlePageQuery from "./article.graphql";
import articleAuthorQuery from "./article-author.graphql";
import articleLikeMutation from "./article-like.graphql";
import { PanelContainer, Panel } from "imports/ui/components/panel";

const ArticleSubtitle = styled.h4`
	color: rgba(0, 0, 0, 0.54);
	margin: 5px auto;
`;

const AuthorName = styled.h5`
	display: inline-block;
	color: black;
	margin-right: 8px;
	margin-top: 20px;
	margin-bottom: 8px;
`;

const ArticlePublishedDate = styled.h6`
	display: inline-block;
	color: rgba(0, 0, 0, 0.54);
	margin: 5px auto;
`;

const ArticleImage = styled.img`
	width: calc(100% + 60px);
	margin: 0 -30px;
	margin-bottom: 30px;

	${forSize.phoneOnly} {
		width: calc(100% + 40px);
		margin: 0 -20px;
		margin-bottom: 20px;
	}
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
	max-width: 710px;
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
	width: calc(100% + 60px);
	margin: 20px -30px;

	${forSize.phoneOnly} {
		width: calc(100% + 40px);
		margin: 20px -20px;
	}
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
		author: ArticleAuthor;
		publishDate: string;
		isLikedByCurrentUser: boolean;
		numberOfLikes: number;
	};
	user?: any;
};

// Article Component
function Article(props: ArticleProps) {
	const dateOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	let articlePublishedDate = new Date(
		props.article.publishDate
	).toLocaleDateString("es-MX", dateOptions);

	// Display either the author name or the company name of the author

	const AuthorTitleName = () => {
		if (props.article.author.authorName) {
			return (
				<AuthorName>Por {props.article.author.authorName}</AuthorName>
			);
		} else {
			return (
				<AuthorName>
					Por {props.article.author.authorCompanyName}
				</AuthorName>
			);
		}
	};

	const [articleLike, { likeData }] = useMutation(articleLikeMutation);

	// Modal is displayed if user likes article and is not logged in
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(
		loginRegisterModal
	);

	function likeButton() {
		articleLike({
			variables: {
				input: {
					articleSlug: props.article.slug,
					isArticleLiked: props.article.isLikedByCurrentUser,
				},
			},
		}).catch(errors => {
			console.error("err: ", errors.message);
			if (errors.message.includes("NOT_LOGGED_IN")) {
				setLoginRegisterModal(
					<PopupModal isOpen={true}>
						<RegisterLoginModal errorText="Regístrate o inicia una sesión para guardar el artículo" />
					</PopupModal>
				);
			}
		});
	}

	let LikeButtonIcon = () => <FavoriteBorderIcon />;
	if (props.article && props.article.isLikedByCurrentUser) {
		LikeButtonIcon = () => <FavoriteIcon />;
	}

	const domain = "www.vize.mx";
	return (
		<>
			<BackToResourcesHeader />

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

				<ArticleContactSection author={props.article.author} />
			</Panel>

			<ArticleFooter>
				<button onClick={likeButton}>
					<LikeButtonIcon />
				</button>
				<NumLikes>{props.article.numberOfLikes}</NumLikes>

				<SocialShareButtons>
					<WhatsappShareButton
						url={
							domain +
							urlGenerators.vizeArticleUrl(props.article.slug)
						}
						title="Hola, estoy leyendo este artículo y te lo recomiendo!"
					>
						<WhatsappIcon size="27" round={true} />
					</WhatsappShareButton>

					<FacebookShareButton
						url={
							domain +
							urlGenerators.vizeArticleUrl(props.article.slug)
						}
						quote="Hola, estoy leyendo este artículo y se los recomiendo!"
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size="27" round={true} />
					</FacebookShareButton>
				</SocialShareButtons>
			</ArticleFooter>
			{loginRegisterModal}
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

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	ReactGA.event({
		category: "User",
		action: "Viewed Article",
		label: slug,
	});
	ReactPixel.track("Viewed Article", {
		category: "User",
		label: slug,
	});

	return (
		<>
			<PageWrapper title={data.article.title}>
				<PanelContainer>
					<Article article={data.article} user={props.user} />

					<SectionTitle>Topics</SectionTitle>
					<Topics topics={data.articleTopics} />

					<SectionTitle>Recent</SectionTitle>
					<Articles articles={data.searchRecentArticles.nodes} />
				</PanelContainer>
			</PageWrapper>
		</>
	);
}

export default withRouter(withUser(ArticlePage));
