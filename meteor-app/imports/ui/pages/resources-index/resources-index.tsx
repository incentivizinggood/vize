import React from "react";
import { useQuery } from "react-apollo";
import styled from "styled-components";

import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";
import { PanelContainer } from "imports/ui/components/panel";
import { forSize } from "imports/ui/responsive.js";

import resourcesIndexPageQuery from "./resources-index.graphql";
import { SectionTitle, Articles, Topics } from "./components";

import { translations } from "imports/ui/translations";

const T = translations.resources;

type ResourcesIndexProps = {
	totalCount: number;
	topics: {
		topicName: string;
		iconImageURL: string;
	}[];
	recentArticles: {
		title: string;
		slug: string;
		topicName: string;
		articleImageURL: string;
		publishDate: string;
	}[];
	highlightedArticles: {
		title: string;
		slug: string;
		topicName: string;
		articleImageURL: string;
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
					<T.featuredArticles />
				</SectionTitle>
				<Articles articles={props.highlightedArticles} />

				<SectionTitle>
					<T.topics />
				</SectionTitle>
				<Topics topics={props.topics} />

				<SectionTitle>
					<T.recentArticles />
				</SectionTitle>
				<Articles articles={props.recentArticles.nodes} />
			</PanelContainer>
		</PageWrapper>
	);
}

function ResourcesIndexContainer() {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);

	const { loading, error, data } = useQuery(resourcesIndexPageQuery, {
		variables: { currentPageNum },
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
			recentArticles={data.searchRecentArticles}
			highlightedArticles={data.highlightedArticles}
			topics={data.articleTopics}
			currentPageNum={currentPageNum}
			setCurrentPageNum={setCurrentPageNum}
		/>
	);
}

export default ResourcesIndexContainer;
