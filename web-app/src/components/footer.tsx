import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as urlGenerators from "src/pages/url-generators";

import { forSize } from "src/responsive";
import colors from "src/colors";
import { useTranslations } from "src/translations";

import facebookIcon from "src/images/facebook.png";
import instagramIcon from "src/images/instagram.png";
import linkedInIcon from "src/images/linkedin.png";
import whatsAppIcon from "src/images/whatsapp.png";

const FooterContainer = styled.footer`
	padding: 1.5em;
	background: #232326;
	text-align: left;
	color: #cbcbcb;
	z-index: 3;

	> * {
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	a {
		font-size: 17px;
		color: #cbcbcb;

		&:hover,
		&:focus {
			color: ${colors.old.vizeBlue};
		}
	}
`;

const LinksContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	${forSize.tabletAndDown} {
		flex-direction: column;
		> * + * {
			margin-top: 7px;
		}
	}
`;

const InternalLinks = styled.div`
	> * {
		display: inline-block;
		margin-left: 0;
	}

	> * + * {
		margin-left: 60px;
	}
`;

const SocialLinks = styled.div`
	> * {
		display: inline-block;
		margin-left: 10px;
	}
`;

const WhatsApp = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 8px;
`;

const SocialIcon = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 8px;
`;

const CopyRight = styled.div`
	display: block;
	margin-top: 10px;
	padding: 7px 0 0 0;
	border-top: 1px solid #aaa;

	text-align: center;
`;

const ContactNumberLink = styled.a`
	font-weight: bold;
	color: #337ab7 !important;
	text-decoration: underline;
`;

export default function Footer(): JSX.Element {
	const t = useTranslations().footer;
	const currentYear = new Date().getFullYear();

	return (
		<FooterContainer>
			<LinksContainer>
				<InternalLinks>
					<Link to={`/${urlGenerators.queryRoutes.about}`}>
						{t.aboutUs}
					</Link>
					<Link to={`/${urlGenerators.queryRoutes.contactUs}`}>
						{t.contactUs}
					</Link>
					{/* commenting out until we have a help page
					<Link to={`/${urlGenerators.queryRoutes.help}`}>
						{t.help}
					</Link>
					-->*/}
				</InternalLinks>

				<SocialLinks>
					<a
						href="https://www.facebook.com/Vize-Incentivando-El-Bien-468437690335687/"
						rel="noreferrer"
						target="_blank"
					>
						<SocialIcon src={facebookIcon} alt="Facebook" />
					</a>
					{/* Commenting until our twitter account is active
					<a
						href="https://www.twitter.com/vizeglobal"
						rel="noreferrer"
						target="_blank"
					>
						<SocialIcon src="/images/twitter.png" alt="Twitter" />
					</a>
					*/}
					<a
						href="https://www.instagram.com/incentivandoelbien/"
						rel="noreferrer"
						target="_blank"
					>
						<SocialIcon src={instagramIcon} alt="Instagram" />
					</a>
					<a
						href="https://www.linkedin.com/company/incentivizinggood"
						rel="noreferrer"
						target="_blank"
					>
						<SocialIcon src={linkedInIcon} alt="LinkedIn" />
					</a>
				</SocialLinks>
			</LinksContainer>
			<CopyRight>
				<LinksContainer>
					<InternalLinks>
						<ContactNumberLink
							href="https://wa.me/5216647480001"
							rel="noreferrer"
							target="_blank"
						>
							<WhatsApp src={whatsAppIcon} alt="WhatsApp" /> +52
							(664) 748-0001
						</ContactNumberLink>
					</InternalLinks>
					<SocialLinks>
						Vize © {currentYear}. {t.allRightsReserved}
					</SocialLinks>
				</LinksContainer>
			</CopyRight>
		</FooterContainer>
	);
}
