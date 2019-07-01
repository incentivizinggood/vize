import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { i18n } from "meteor/universe:i18n";

import { forSize } from "imports/ui/responsive";
import styleVariables from "imports/ui/style-variables";

const T = i18n.createComponent();

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
		text-decoration: underline;

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

const Links = styled.div`
	> * {
		display: inline-block;
		margin: 0;
	}
	> * + * {
		margin-left: 10px;
	}
`;

const SocialIcon = styled.img`
	width: 50px;
	height: 50px;
`;

const CopyRight = styled.p`
	display: block;
	margin-top: 10px;
	padding: 7px 0 0 0;
	border-top: 1px solid #aaa;

	text-align: center;
`;

// About Contact Help | social media
export default function Footer() {
	return (
		<FooterContainer>
			<LinksContainer>
				<Links>
					<Link to="/about">
						<T>common.footer.about_us</T>
					</Link>
					<Link to="/contact-us">Contact Us</Link>
					<Link to="/help">Help</Link>
				</Links>

				<Links>
					<a href="https://www.linkedin.com/company/incentivizinggood">
						<SocialIcon src="/images/linkedin.png" alt="LinkedIn" />
					</a>
					<a href="https://www.facebook.com/incentivizinggood">
						<SocialIcon src="/images/facebook.png" alt="Facebook" />
					</a>
					<a href="https://www.twitter.com/vizeglobal">
						<SocialIcon src="/images/twitter.png" alt="Twitter" />
					</a>
					<a href="https://www.instagram.com/incentivandoelbien/">
						<SocialIcon
							src="/images/instagram.png"
							alt="Instagram"
						/>
					</a>
				</Links>
			</LinksContainer>
			<CopyRight>
				Vize © 2019. <T>common.footer.all_rights_reserved</T>
			</CopyRight>
		</FooterContainer>
	);
}
