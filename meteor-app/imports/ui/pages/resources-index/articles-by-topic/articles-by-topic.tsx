import React from "react";
import { useQuery } from "react-apollo";
import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";

import articleByTopicPageQuery from "./articles-by-topic.graphql";
import { PanelContainer } from "imports/ui/components/panel";
import { BackToResourcesHeader, Articles } from "../components";
import { withRouter } from "react-router-dom";

type ArticlesByTopicProps = {
	articles: {
		title: string;
		slug: string;
		topicName: string;
		articleImageURL: string;
		publishDate: string;
	}[];
	topicName: string;
};

function ArticlesByTopic(props: ArticlesByTopicProps) {
	const pageTitle = "Recursos de " + props.topicName + " - Vize";
	return (
		<PageWrapper title={pageTitle}>
			<PanelContainer>
				<BackToResourcesHeader topicName={props.topicName} />
				<Articles articles={props.articles} />
			</PanelContainer>
		</PageWrapper>
	);
}

function ArticlesByTopicPage(props) {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);
	const topicName = props.match.params.topicName;

	const { loading, error, data } = useQuery(articleByTopicPageQuery, {
		variables: { id: topicName, currentPageNum },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	return (
		<ArticlesByTopic
			articles={data.searchArticlesByTopic.nodes}
			topicName={topicName}
		/>
	);
}

export default withRouter(ArticlesByTopicPage);
