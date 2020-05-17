import React from "react";
import styled from "styled-components";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
const ContactAuthorContainter = styled.div`
	display: flex;
	margin: 0 auto;
	width: fit-content;
`;

const ContactAuthorImage = styled.img`
	margin-right: 10px;
	width: 50px;
	height: 50px;
`;

const ContactAuthorTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ContactAuthorCompany = styled.h5`
	color: rgba(0, 0, 0, 0.54);
	line-height: 1.25;
	font-size: 1rem;
`;

const ContactDetails = styled.div`
	padding: 20px 0;
	padding-left: 5%;
	padding-right: 5%;
`;

const ContactItem = styled.div`
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

function ArticleContactSection() {
	return (
		<ContactSectionContainter>
			<ContactTitle> Contacto </ContactTitle>
			<ContactDetails>
				<ContactAuthorContainter>
					<ContactAuthorImage src="/images/icons/profile-icon.png" />
					<ContactAuthorTitleContainer>
						<h4>
							<strong>Ivan Garcia</strong>
						</h4>
						<ContactAuthorCompany>
							Incentivando El Bien
						</ContactAuthorCompany>
					</ContactAuthorTitleContainer>
				</ContactAuthorContainter>
				<br />
				<ContactItem>
					<PhoneIcon />
					<h6> 956 279 2407 </h6>
					<ContactItemDescription>Telefono</ContactItemDescription>
				</ContactItem>
				<ContactItem>
					<EmailIcon />
					<h6> jalvarez@vize.mx </h6>
					<ContactItemDescription>Email</ContactItemDescription>
				</ContactItem>
				<ContactItem>
					<PublicIcon />
					<h6> www.vize.mx </h6>
					<ContactItemDescription>Sitio Web</ContactItemDescription>
				</ContactItem>
				<ContactItem>
					<LocationOnIcon />
					<h6> Tijuana, BC </h6>
					<ContactItemDescription>Dirrecion</ContactItemDescription>
				</ContactItem>
			</ContactDetails>
		</ContactSectionContainter>
	);
}

export default ArticleContactSection;
