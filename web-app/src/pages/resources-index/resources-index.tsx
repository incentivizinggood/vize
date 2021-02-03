import React from "react";
import { useQuery } from "react-apollo";
import styled from "styled-components";

import Spinner from "src/components/Spinner";
import PageWrapper from "src/components/page-wrapper";
import { PanelContainer } from "src/components/panel";
import { forSize } from "src/responsive";

import resourcesIndexPageQuery from "./resources-index.graphql";
import { SectionTitle, Resources, Topics } from "./components";

import { translations } from "src/translations";

const T = translations.resources;

type ResourcesIndexProps = {
	totalCount: number;
	topics: {
		topicName: string;
		iconImageURL: string;
	}[];
	recentResources: {
		title: string;
		slug: string;
		topicName: string;
		resourceImageURL: string;
		publishDate: string;
	}[];
	highlightedResources: {
		title: string;
		slug: string;
		topicName: string;
		resourceImageURL: string;
		publishDate: string;
	}[];

	currentPageNum: number;
	setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>;
};

function ResourcesIndex(props: ResourcesIndexProps) {
	return (
		<PageWrapper title="Recursos">
			<PanelContainer>
				<SectionTitle>
					<T.featuredResources />
				</SectionTitle>
				<Resources resources={props.highlightedResources} />

				<SectionTitle>
					<T.topics />
				</SectionTitle>
				<Topics topics={props.topics} />

				<SectionTitle>
					<T.recentResources />
				</SectionTitle>
				<Resources resources={props.recentResources.nodes} />
			</PanelContainer>
		</PageWrapper>
	);
}

function ResourcesIndexContainer({ audienceType }: { audienceType: string }) {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);

	const { loading, error, data } = useQuery(resourcesIndexPageQuery, {
		variables: { currentPageNum, audienceType },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		// TODO: Display errors in better way
		return <>{JSON.stringify(error)}</>;
	}

	return (
		<ResourcesIndex
			recentResources={data.searchRecentResources}
			highlightedResources={data.highlightedResources}
			topics={data.resourceTopics}
			currentPageNum={currentPageNum}
			setCurrentPageNum={setCurrentPageNum}
		/>
	);
}

export default ResourcesIndexContainer;
