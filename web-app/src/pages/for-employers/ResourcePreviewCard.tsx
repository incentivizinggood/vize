import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { LinkButton } from "src/components/button";
import * as urlGenerators from "src/pages/url-generators";

const ResourceCard = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: 16px;
	margin-bottom: 10px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const ResourceContentWrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;
const ResourceImage = styled.img`
	height: 260px;
	border-radius: 16px;
	width: 100%;
`;
const ResourceDatePublished = styled.span`
	color: #777;
`;
const ResourceTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	padding-bottom: 10px;
	padding-top: 10px;
`;
const ResourceDescription = styled.span`
	line-height: 1.8;
	margin-bottom: 10px;
`;

interface ResourcePreviewCardProps {
	resource: {
		slug: string;
		publishDate: string;
		title: string;
		subtitle: string;
		resourceImageURL: string;
	};
	resourceIndex: number;
	activeResourceCard: number;
	isMobile: boolean;
	audienceType: string;
}

function ResourcePreviewCard(props: ResourcePreviewCardProps): JSX.Element {
	const {
		resource,
		activeResourceCard,
		resourceIndex,
		isMobile,
		audienceType,
	} = props;
	console.log("active", activeResourceCard);
	console.log("current", resourceIndex);
	return (
		<Col
			xs={12}
			md={4}
			key={resourceIndex}
			className={
				isMobile
					? activeResourceCard === resourceIndex
						? "active"
						: "inactive"
					: ""
			}
		>
			<ResourceCard>
				<ResourceImage alt="top" src={resource.resourceImageURL} />
				<ResourceContentWrapper>
					<ResourceDatePublished>
						{resource.publishDate}
					</ResourceDatePublished>
					<ResourceTitle>
						{resource.title && resource.title.length > 65
							? `${resource.title.substring(0, 65)}...`
							: resource.title}
					</ResourceTitle>
					<ResourceDescription>
						{resource.subtitle && resource.subtitle.length > 130
							? `${resource.subtitle.substring(0, 130)}...`
							: resource.subtitle}
					</ResourceDescription>
					<LinkButton
						$primary
						to={urlGenerators.vizeResourceUrl(
							resource.slug,
							audienceType
						)}
						style={{ marginTop: "auto" }}
					>
						Read
					</LinkButton>
				</ResourceContentWrapper>
			</ResourceCard>
		</Col>
	);
}

export default ResourcePreviewCard;
