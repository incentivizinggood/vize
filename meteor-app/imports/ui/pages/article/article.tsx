import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-apollo";

import Spinner from "imports/ui/components/Spinner";
import PageWrapper from "imports/ui/components/page-wrapper";

import articlePageQuery from "./article.graphql";
import { PanelContainer, Panel } from "imports/ui/components/panel";

type ArticleProps = { title: string; body: string };

function Article({ title, body }: ArticleProps) {
	return (
		<PageWrapper title={title}>
			<PanelContainer>
				<Panel>
					<h1>{title}</h1>
					<ReactMarkdown source={body} />
				</Panel>
			</PanelContainer>
		</PageWrapper>
	);
}

function ArticleContainer() {
	const { slug } = useParams();

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

export default ArticleContainer;
