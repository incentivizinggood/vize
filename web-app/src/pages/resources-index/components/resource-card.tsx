import React from "react";
import styled from "styled-components";

import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";
import { Link } from "react-router-dom";
import { forSize } from "src/responsive";
import { borderRadius, boxShadow } from "src/global-styles";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.resources;

const resourceDetailsPadding = "8px";
const footerHeight = "27px";

const ResourceCard = styled.div`
	display: flex;
	background-color: white;
	border-radius: ${borderRadius.container};
	margin: 10px;
	height: 145px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);

	${forSize.phoneOnly} {
		height: 125px;
		border-radius: ${borderRadius.containerMobile};
	}
`;

const ResourceDetails = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: ${resourceDetailsPadding};
`;

const ResourceImage = styled.img`
	object-fit: cover;
	width: 130px;
	height: 130px;
	margin: auto;
	margin-left: 5px;
	border-radius: ${borderRadius.smallImage};

	${forSize.phoneOnly} {
		width: 110px;
		height: 110px;
	}
`;

const ResourceTitle = styled.h4`
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 15px;
`;

const ResourceCategory = styled.h5`
	color: rgba(0, 0, 0, 0.54);
	line-height: 1.25;
	font-size: 1rem;
`;

// Contains Read More button and Whatsapp + Facebook share buttons
const ResourceFooter = styled.div`
	display: flex;
	position: absolute;
	bottom: 0px;
	right: 0px;
	flex-direction: row-reverse;

	width: 100%;
	padding: ${resourceDetailsPadding};

	> * {
		margin-right: 6px;
	}
`;

const ReadMore = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #e4e6eb;
	color: black;
	font-weight: bold;
	text-align: center;

	height: ${footerHeight};
	width: 85px;
	border-radius: ${borderRadius.button};
`;

const ReadMoreButton = (props) => (
	<ReadMore to={urlGenerators.vizeResourceUrl(props.slug)} {...props}>
		<T.read />
	</ReadMore>
);

type ResourceCardProps = {
	slug: string;
	title: string;
	topicName: string;
	resourceImageURL: string;
};

function ResourceCardComponent(props: ResourceCardProps) {
	const domain = "www.vize.mx";
	let audienceType = "WORKERS";
	if (
		window.location.href.includes(
			urlGenerators.queryRoutes.employerResources
		)
	)
		audienceType = "EMPLOYERS";

	return (
		<Link
			style={{ color: "black" }}
			to={urlGenerators.vizeResourceUrl(props.slug, audienceType)}
			{...props}
		>
			<ResourceCard>
				<ResourceImage src={props.resourceImageURL} />
				<ResourceDetails>
					<ResourceTitle>{props.title}</ResourceTitle>
					<ResourceCategory>{props.topicName}</ResourceCategory>
					<ResourceFooter>
						<ReadMoreButton slug={props.slug} />

						<WhatsappShareButton
							url={
								domain +
								urlGenerators.vizeResourceUrl(props.slug)
							}
							title="Hola, estoy leyendo este recurso y te lo recomiendo!"
						>
							<WhatsappIcon size={footerHeight} round={true} />
						</WhatsappShareButton>

						<FacebookShareButton
							url={
								domain +
								urlGenerators.vizeResourceUrl(props.slug)
							}
							quote="Hola, estoy leyendo este recurso y se los recomiendo!"
							hashtag="#incentivandoelbien"
						>
							<FacebookIcon size={footerHeight} round={true} />
						</FacebookShareButton>
					</ResourceFooter>
				</ResourceDetails>
			</ResourceCard>
		</Link>
	);
}

export default ResourceCardComponent;
