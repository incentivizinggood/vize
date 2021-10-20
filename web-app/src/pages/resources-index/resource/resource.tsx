import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery, useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withUser } from "src/hoc/user";
import { boxShadow } from "src/global-styles";
import { ResourceAuthor } from "imports/api/models/types";
import * as analytics from "src/startup/analytics";

import {
	SectionTitle,
	BackToResourcesHeader,
	Resources,
	Topics,
} from "../components";
import ResourceContactSection from "./resource-contact";
import Spinner from "src/components/Spinner";
import PageWrapper from "src/components/page-wrapper";
import { forSize } from "src/responsive";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as urlGenerators from "src/pages/url-generators";

import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/pages/register-login-forms/components/register-login-modal";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

import resourcePageQuery from "./resource.graphql";
import resourceLikeMutation from "./resource-like.graphql";
import { PanelContainer, Panel } from "src/components/panel";

const ResourceSubtitle = styled.h4`
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

const ResourcePublishedDate = styled.h6`
	display: inline-block;
	color: rgba(0, 0, 0, 0.54);
	margin: 5px auto;
`;

const ResourceImage = styled.img`
	width: calc(100% + 60px);
	margin: 0 -30px;
	margin-bottom: 30px;

	${forSize.phoneOnly} {
		width: calc(100% + 40px);
		margin: 0 -20px;
		margin-bottom: 20px;
	}
`;

const ResourceFooter = styled.div`
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
	box-shadow: ${boxShadow.wide};

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

type ResourceProps = {
	resource: {
		slug: string;
		title: string;
		subtitle: string;
		body: string;
		resourceImageURL: string;
		topicName: string;
		author: ResourceAuthor;
		publishDate: string;
		isLikedByCurrentUser: boolean;
		numberOfLikes: number;
	};
	user?: any;
};

// Resource Component
function Resource(props: ResourceProps) {
	const dateOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	let resourcePublishedDate = new Date(
		props.resource.publishDate
	).toLocaleDateString("es-MX", dateOptions);

	// Display either the author name or the company name of the author

	const AuthorTitleName = () => {
		if (props.resource.author.authorName) {
			return (
				<AuthorName>Por {props.resource.author.authorName}</AuthorName>
			);
		} else {
			return (
				<AuthorName>
					Por {props.resource.author.authorCompanyName}
				</AuthorName>
			);
		}
	};

	const [resourceLike, { likeData }] = useMutation(resourceLikeMutation);

	// Modal is displayed if user likes resource and is not logged in
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);

	function likeButton() {
		resourceLike({
			variables: {
				input: {
					resourceSlug: props.resource.slug,
					isResourceLiked: props.resource.isLikedByCurrentUser,
				},
			},
		}).catch((errors) => {
			// Error in English: Not Logged In
			if (
				errors.message.includes(
					"Tienes que iniciar una sesión o registrarte"
				)
			) {
				setLoginRegisterModal(
					<PopupModal isOpen={true}>
						<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para guardar el recurso" />
					</PopupModal>
				);
			}
		});
	}

	let LikeButtonIcon = () => <FavoriteBorderIcon />;
	if (props.resource && props.resource.isLikedByCurrentUser) {
		LikeButtonIcon = () => <FavoriteIcon />;
	}

	if (props.user) {
		loginRegisterModal = null;
	}

	const domain = "www.vize.mx";
	return (
		<>
			<BackToResourcesHeader />

			<Panel>
				<h2>{props.resource.title}</h2>

				<ResourceSubtitle>{props.resource.subtitle}</ResourceSubtitle>

				<AuthorTitleName />

				<ResourcePublishedDate>
					{resourcePublishedDate}
				</ResourcePublishedDate>

				<ResourceImage src={props.resource.resourceImageURL} />

				<ReactMarkdown source={props.resource.body} />

				<SectionLineSeparateor />

				<ResourceContactSection author={props.resource.author} />
			</Panel>

			<ResourceFooter>
				<button onClick={likeButton}>
					<LikeButtonIcon />
				</button>
				<NumLikes>{props.resource.numberOfLikes}</NumLikes>

				<SocialShareButtons>
					<WhatsappShareButton
						url={
							domain +
							urlGenerators.vizeResourceUrl(props.resource.slug)
						}
						title="Hola, estoy leyendo este recurso y te lo recomiendo!"
					>
						<WhatsappIcon size="27" round={true} />
					</WhatsappShareButton>

					<FacebookShareButton
						url={
							domain +
							urlGenerators.vizeResourceUrl(props.resource.slug)
						}
						quote="Hola, estoy leyendo este recurso y se los recomiendo!"
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size="27" round={true} />
					</FacebookShareButton>
				</SocialShareButtons>
			</ResourceFooter>
			{loginRegisterModal}
		</>
	);
}

function ResourcePage(props) {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);

	const slug = props.match.params.slug;

	// Gets data for the resource, topics, and recent resources
	const { loading, error, data } = useQuery(resourcePageQuery, {
		variables: { id: slug, currentPageNum },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	analytics.sendEvent({
		category: "User",
		action: "Viewed Article",
		label: slug,
	});

	return (
		<>
			<PageWrapper title={data.resource.title}>
				<PanelContainer>
					<Resource resource={data.resource} user={props.user} />

					<SectionTitle>Topics</SectionTitle>
					<Topics topics={data.resourceTopics} />

					<SectionTitle>Recent</SectionTitle>
					<Resources resources={data.searchRecentResources.nodes} />
				</PanelContainer>
			</PageWrapper>
		</>
	);
}

export default withRouter(withUser(ResourcePage));
