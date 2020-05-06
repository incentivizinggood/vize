import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import styled from "styled-components";

import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";
import { PanelContainer, Panel } from "imports/ui/components/panel";

import articleIndexPageQuery from "./article-index.graphql";
import ArticleCardComponent from "imports/ui/components/article-components/article-card";

type ArticleIndexProps = {
	totalCount: number;
	nodes: {
		title: string;
		slug: string;
		publishDate: string;
	}[];

	currentPageNum: number;
	setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>;
};

const SectionTitle = styled.h2`
	text-align: center;
	font-weight: bold;
`;

/*

<ul>
	{props.nodes.map(a => (
		<li>
			<Link to={`/article/${a.slug}`}>{a.title}</Link>
		</li>
	))}
</ul>
<button onClick={() => props.setCurrentPageNum(n => n - 1)}>
	Prev
</button>
{props.currentPageNum}
<button onClick={() => props.setCurrentPageNum(n => n + 1)}>
	Next
</button>
*/
function ArticleIndex(props: ArticleIndexProps) {
	return (
		<PageWrapper title="Articles">
			<PanelContainer>
				<Panel>
					<SectionTitle> Highlighted </SectionTitle>
				</Panel>

				<ArticleCardComponent />

				<ArticleCardComponent />
			</PanelContainer>

			<PanelContainer>
				<Panel>
					<SectionTitle> Topics </SectionTitle>
				</Panel>
				<Panel>
					<ArticleCardComponent />
				</Panel>
				<Panel>
					<ArticleCardComponent />
				</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}

function ArticleIndexContainer() {
	const [currentPageNum, setCurrentPageNum] = React.useState(0);

	const { loading, error, data } = useQuery(articleIndexPageQuery, {
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
		<ArticleIndex
			{...data.searchArticles}
			currentPageNum={currentPageNum}
			setCurrentPageNum={setCurrentPageNum}
		/>
	);
}

export default ArticleIndexContainer;
