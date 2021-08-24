import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import colors from "src/colors";

interface ResourcePreviewCardProps {
	resource: {
		id: number,
		date: string,
		title: string,
		text: string,
		img: string,
	},
	activeResourceCard: number
	isMobile: boolean
}
const ResourceCard = styled.div`
	background:#fff;
	border-radius:16px 16px 6px;
	margin-bottom:10px;
`;
const ResourceContentWrapper = styled.div`
	padding:10px 20px;
	display:flex;
	flex-direction:column;
`;
const ResourceImage = styled.img`
	height:260px;
	border-radius:16px;
	width:100%;
`;
const ResourceDatePublished = styled.span`
	color: #777;
`;
const ResourceTitle = styled.span`
	font-size:16px;
	font-weight:700;
	padding-bottom:10px;
	padding-top:10px;
`;
const ResourceDescription = styled.span`
	line-height:1.8;
`;
const ResourceReadButton = styled.button`
	margin-top:5px;
	align-self: flex-start;
	color:${colors.primaryColorBlue};
	padding-left: 0px;
`;
function ResourcePreviewCard(props: ResourcePreviewCardProps): JSX.Element {
	const { resource, activeResourceCard, isMobile } = props
	return <Col xs={12} md={4} key={resource.id} className={isMobile ? activeResourceCard === resource.id ? 'active' : 'inactive' : ''}>
		<ResourceCard>
			<ResourceImage alt="top" src={resource.img} />
			<ResourceContentWrapper>
				<ResourceDatePublished >{resource.date}</ResourceDatePublished>
				<ResourceTitle >{resource.title && resource.title.length > 65 ? `${resource.title.substring(0, 65)}...` : resource.title}</ResourceTitle>
				<ResourceDescription >{resource.text && resource.text.length > 130 ? `${resource.text.substring(0, 130)}...` : resource.text}</ResourceDescription>
				<ResourceReadButton>Read</ResourceReadButton>
			</ResourceContentWrapper>
		</ResourceCard>
	</Col>
}

export default ResourcePreviewCard;