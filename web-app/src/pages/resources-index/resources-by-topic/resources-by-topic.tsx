import React from "react";
import { useQuery } from "react-apollo";
import Spinner from "src/components/Spinner";
import PageWrapper from "src/components/page-wrapper";

import resourceByTopicPageQuery from "./resources-by-topic.graphql";
import { PanelContainer } from "src/components/panel";
import { BackToResourcesHeader, Resources } from "../components";
import { withRouter } from "react-router-dom";

type ResourcesByTopicProps = {
	resources: {
		title: string;
		slug: string;
		topicName: string;
		resourceImageURL: string;
		publishDate: string;
	}[];
	topicName: string;
};

function ResourcesByTopic(props: ResourcesByTopicProps) {
	const pageTitle = "Recursos de " + props.topicName + " - Vize";
	return (
		<PageWrapper title={pageTitle}>
			<PanelContainer>
				<BackToResourcesHeader topicName={props.topicName} />
				<Resources resources={props.resources} />
			</PanelContainer>
		</PageWrapper>
	);
}

function ResourcesByTopicPage(props) {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);
	const topicName = props.match.params.topicName;

	const { loading, error, data } = useQuery(resourceByTopicPageQuery, {
		variables: {
			id: topicName,
			currentPageNum,
			audienceType: props.audienceType,
		},
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	return (
		<ResourcesByTopic
			resources={data.searchResourcesByTopic.nodes}
			topicName={topicName}
		/>
	);
}

export default withRouter(ResourcesByTopicPage);
