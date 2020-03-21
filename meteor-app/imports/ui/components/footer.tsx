import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { forSize } from "imports/ui/responsive";
import styleVariables from "imports/ui/style-variables";
import { translations } from "imports/ui/translations";

const T = translations.footer;

const FooterContainer = styled.footer`
	padding: 1.5em;
	background: #232326;
	text-align: left;
	color: #cbcbcb;

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
			color: ${styleVariables.vizeBlue};
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

const CopyRight = styled.p`
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

// About Contact Help | social media
export default function Footer() {
	return (
		<FooterContainer>
			<LinksContainer>
				<InternalLinks>
					<Link to="/about">
						<T.aboutUs />
					</Link>
					<Link to="/contact-us">
						<T.contactUs />
					</Link>
					{/* commenting out until we have a help page
					<Link to="/help">
						<T.help />
					</Link>
					-->*/}
				</InternalLinks>

				<SocialLinks>
					<a
						href="https://www.facebook.com/Vize-Incentivando-El-Bien-468437690335687/"
						target="_blank"
					>
						<SocialIcon src="/images/facebook.png" alt="Facebook" />
					</a>
					{/* Commenting until our twitter account is active
					<a
						href="https://www.twitter.com/vizeglobal"
						target="_blank"
					>
						<SocialIcon src="/images/twitter.png" alt="Twitter" />
					</a>
					*/}
					<a
						href="https://www.instagram.com/incentivandoelbien/"
						target="_blank"
					>
						<SocialIcon
							src="/images/instagram.png"
							alt="Instagram"
						/>
					</a>
					<a
						href="https://www.linkedin.com/company/incentivizinggood"
						target="_blank"
					>
						<SocialIcon src="/images/linkedin.png" alt="LinkedIn" />
					</a>
				</SocialLinks>
			</LinksContainer>
			<CopyRight>
				<LinksContainer>
					<InternalLinks>
						<ContactNumberLink
							href="https://wa.me/5216647480001"
							target="_blank"
						>
							<WhatsApp
								src="/images/whatsapp.png"
								alt="WhatsApp"
							/>{" "}
							+52 (664) 748-0001
						</ContactNumberLink>
					</InternalLinks>
					<SocialLinks>
						Vize © 2020. <T.allRightsReserved />
					</SocialLinks>
				</LinksContainer>
			</CopyRight>
		</FooterContainer>
	);
}
