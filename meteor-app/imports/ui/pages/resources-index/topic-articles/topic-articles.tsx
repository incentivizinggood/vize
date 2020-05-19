import React from "react";
import { useQuery } from "react-apollo";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { SectionTitle, ArticleCard } from "../components";
import ArticleContactSection from "./article-contact";
import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

import articlePageQuery from "./article.graphql";
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

type TopicArticlesProps = { topic: string };

function TopicArticles({ topic }: ArticleProps) {
	return (
		<PageWrapper title={title}>
			<PanelContainer>
				<BackToResourcesHeader>
					<Link to="/recursos">
						<ArrowBackIconStyled />
					</Link>
				</BackToResourcesHeader>

				<ArticleCard />

				<ArticleCard />
			</PanelContainer>
		</PageWrapper>
	);
}

function TopicArticlesContainer(props) {
	const slug = props.match.params.slug;

	const { loading, error, data } = useQuery(articlePageQuery, {
		variables: { id: slug },
	});

	console.log({ loading, error, data });

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	return <Article {...data.article} />;
}

export default withRouter(TopicArticlesContainer);
