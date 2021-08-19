import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
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
	img{
		height:260px;
		border-radius:16px;
		width:100%;
	}
	
	div{
		padding:10px 20px;
		display:flex;
		flex-direction:column;
		
		.title{
			font-size:16px;
			font-weight:700;
			padding-bottom:10px;
			padding-top:10px;
		}
		.text{
			line-height:1.8;
		}
	}
`;
function ResourcePreviewCard(props: ResourcePreviewCardProps): JSX.Element {
    const { resource, activeResourceCard, isMobile } = props
    return <Col xs={12} md={4} key={resource.id} className={isMobile ? activeResourceCard === resource.id ? 'active' : 'inactive' : ''}>
        <ResourceCard>
            <img alt="top" src={resource.img} />
            <div>
                <small className="text-muted">{resource.date}</small>
                <span className="title">{resource.title && resource.title.length > 65 ? `${resource.title.substring(0, 65)}...` : resource.title}</span>
                <span className="text">{resource.text && resource.text.length > 130 ? `${resource.text.substring(0, 130)}...` : resource.text}</span>
            </div>
        </ResourceCard>
    </Col>
}

export default ResourcePreviewCard;