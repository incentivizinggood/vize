import React from "react";
import ArticleCard from "./article-card";

type ArticlesProps = {
	articles: {
		title: string;
		slug: string;
		topicName: string;
		articleImageURL: string;
		publishDate: string;
	}[];
};

// Takes in a list of articles to be rendered as article cards. Used for Recent Articles and Highlighted Articles
function Articles({ articles }: ArticlesProps) {
	articles = Array.from(articles);
	return (
		<>
			{articles.map((article, i) => (
				<ArticleCard
					key={i}
					slug={article.slug}
					title={article.title}
					topicName={article.topicName}
					articleImageURL={article.articleImageURL}
				/>
			))}
		</>
	);
}

export default Articles;
