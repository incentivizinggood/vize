import React from "react";
import ResourceCard from "./resource-card";

type ResourcesProps = {
	resources: {
		title: string;
		slug: string;
		topicName: string;
		resourceImageURL: string;
		publishDate: string;
	}[];
};

// Takes in a list of resources to be rendered as resource cards. Used for Recent Resources and Highlighted Resources
function Resources({ resources }: ResourcesProps) {
	resources = Array.from(resources);
	return (
		<>
			{resources.map((resource, i) => (
				<ResourceCard
					key={i}
					slug={resource.slug}
					title={resource.title}
					topicName={resource.topicName}
					resourceImageURL={resource.resourceImageURL}
				/>
			))}
		</>
	);
}

export default Resources;
