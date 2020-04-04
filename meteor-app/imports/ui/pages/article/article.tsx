import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Query } from "react-apollo";

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
	let { slug } = useParams();

	return (
		<Query query={articlePageQuery} variables={{ id: slug }}>
			{({ loading, error, data }) => {
				console.log({ loading, error, data });

				if (loading) {
					return <Spinner />;
				}
				if (error) {
					return <>{JSON.stringify(error)}</>;
				}

				return <Article {...data.article} />;
			}}
		</Query>
	);
}

export default ArticleContainer;
