import React from "react";
import styled from "styled-components";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { translations } from "imports/ui/translations";

const T = translations.resources;

const ContactSectionContainter = styled.div`
	display: flex;
	flex-direction: column;

	background-color: white;
	border-radius: 4px;
`;

const ContactTitle = styled.h3`
	font-weight: bold;
	text-align: center;
`;

// Contact Author Container Start
const AuthorContainter = styled.div`
	display: flex;
	margin: 0 auto;
	width: fit-content;
`;

const AuthorImage = styled.img`
	margin-right: 10px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const AuthorTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

// Primary Title = author name if it exists. Otherwise, it will be company name
const AuthorPrimaryTitle = styled.h4`
	font-weight: bold;
`;

const AuthorSecondaryTitle = styled.h5`
	color: rgba(0, 0, 0, 0.54);
	line-height: 1.25;
	font-size: 1rem;
`;

const AuthorBio = styled.p`
	text-align: center;
`;

const ContactDetails = styled.div`
	padding: 20px 0;
	padding-left: 5%;
	padding-right: 5%;
`;

const ContactItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;

	padding-bottom: 5px;
	margin-bottom: 3px;
	border-bottom: 0.05mm solid #eaebf3;

	> * {
		margin: auto 10px;
	}
`;

const ContactItemDescription = styled.p`
	position: absolute;
	right: 0px;
	font-size: 0.8em;
	margin-right: 0px;
	margin-top: 2px;
`;

type ArticleAuthorProps = {
	author: {
		authorName: string;
		authorCompanyName: string;
		authorImageURL: string;
		authorBio: string;
		contactPhoneNumber: string;
		contactEmail: string;
		websiteURL: string;
		location: string;
	};
};

type ContactItemProps = {
	itemData: string;
	itemDescription: string;
	children: NodeListOf<Element>;
};

function ArticleContactSection(props: ArticleAuthorProps) {
	// If there is no author image, use the default image
	const AuthorImg = () => {
		if (props.author.authorImageURL) {
			return <AuthorImage src={props.author.authorImageURL} />;
		} else {
			return <AuthorImage src="/images/icons/profile-icon.png" />;
		}
	};

	// If author name exists, display it first. Otherwise, just display the company name
	const AuthorTitles = () => {
		if (props.author.authorName) {
			return (
				<>
					<AuthorPrimaryTitle>
						{props.author.authorName}
					</AuthorPrimaryTitle>
					<AuthorSecondaryTitle>
						{props.author.authorCompanyName}
					</AuthorSecondaryTitle>
				</>
			);
		} else {
			return (
				<AuthorPrimaryTitle>
					{props.author.authorCompanyName}
				</AuthorPrimaryTitle>
			);
		}
	};

	// display a contact item only if it has text
	const ContactItem = ({
		itemData,
		itemDescription,
		children,
	}: ContactItemProps) => {
		if (itemData) {
			return (
				<ContactItemContainer>
					{children}
					<h6> {itemData} </h6>
					<ContactItemDescription>
						{itemDescription}
					</ContactItemDescription>
				</ContactItemContainer>
			);
		} else {
			return <></>;
		}
	};

	return (
		<ContactSectionContainter>
			<ContactTitle>
				<T.contact.title />
			</ContactTitle>
			<ContactDetails>
				<AuthorContainter>
					<AuthorImg />
					<AuthorTitleContainer>
						<AuthorTitles />
					</AuthorTitleContainer>
				</AuthorContainter>
				<AuthorBio>{props.author.authorBio}</AuthorBio>

				<br />
				<ContactItem
					itemData={props.author.contactPhoneNumber}
					itemDescription="Telefono"
				>
					<PhoneIcon />
				</ContactItem>
				<ContactItem
					itemData={props.author.contactEmail}
					itemDescription="Email"
				>
					<EmailIcon />
				</ContactItem>
				<ContactItem
					itemData={props.author.websiteURL}
					itemDescription="Sitio Web"
				>
					<PublicIcon />
				</ContactItem>
				<ContactItem
					itemData={props.author.location}
					itemDescription="Localización"
				>
					<LocationOnIcon />
				</ContactItem>
			</ContactDetails>
		</ContactSectionContainter>
	);
}

export default ArticleContactSection;
