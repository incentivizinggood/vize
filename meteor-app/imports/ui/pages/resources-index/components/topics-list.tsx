import React from "react";
import styled from "styled-components";
import TopicCard from "./topic-card";

const TopicsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

type TopicsProps = {
	topics: {
		topicName: string;
		iconImageURL: string;
	}[];
};

// Takes in a list of topics to be rendered on the topics section
function Topics({ topics }: TopicsProps) {
	topics = Array.from(topics);

	return (
		<TopicsContainer>
			{topics.map((topic, i) => (
				<TopicCard
					key={i}
					topicName={topic.topicName}
					iconImageURL={topic.iconImageURL}
				/>
			))}
		</TopicsContainer>
	);
}

export default Topics;
