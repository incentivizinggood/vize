import React from "react";
import { useQuery } from "react-apollo";
import styled from "styled-components";

import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";
import { PanelContainer } from "imports/ui/components/panel";
import { forSize } from "imports/ui/responsive.js";

import resourcesIndexPageQuery from "./resources-index.graphql";
import { SectionTitle, Articles, Topics } from "./components";

const NavbarMobileHeight = "65px";

const IndexPageContainer = styled.div`
	width: 100%;
	height: 100%;
	max-width: 800px;
	margin-right: auto;
	margin-left: auto;

	background-color: ${props => props.theme.background};
	padding: 112px 20px 20px 20px;

	${forSize.phoneOnly} {
		padding: ${NavbarMobileHeight} 0px 50px 0px;
	}
`;

const SectionContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background};
	margin-bottom: 20px;
`;

const ArticlesContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 500px;

	background-color: ${props => props.theme.surface};
	color: ${props => props.theme.onSurface};
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: 30px;

	${forSize.phoneOnly} {
		padding: 20px;
	}
`;

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
				<SectionTitle>Highlighted</SectionTitle>
				<Articles articles={props.highlightedArticles} />

				<SectionTitle>Topics</SectionTitle>
				<Topics topics={props.topics} />

				<SectionTitle>Recent</SectionTitle>
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

	console.log({ loading, error, data });

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
