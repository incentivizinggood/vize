import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import i18n from "meteor/universe:i18n";

import { forSize } from "/imports/ui/responsive.js";
import styleVariables from "/imports/ui/style-variables.js";

const T = i18n.createComponent();

const FooterContainer = styled.div`
	/* From sass/base/_reset.scss and sass/pages/_company-profile.scss */
	padding: 8em 0;

	/* From sass/components/_footer.scss */
	background: #232326;
	text-align: left;
	color: #cbcbcb;

	h3 {
		font-size: 2.5em;
		color: ${styleVariables.blueMarguerite};
		margin-bottom: 0.5em;
	}

	a {
		font-size: 17px;
		color: #cbcbcb;

		&:hover,
		&:focus {
			color: ${styleVariables.vizeBlue};
		}
	}

	/* From sass/responsive/_desktop-and-down.scss */
	${forSize.desktopAndDown} {
		padding: 4em 0;

		img {
			padding: 0;
			width: 100%;
		}
	}

	/* From sass/responsive/_tablet-landscape-and-down.scss */
	${forSize.tabletLandscapeAndDown} {
		padding: 5em 0;
	}

	/* From sass/responsive/_phones-only.scss */
	${forSize.phoneOnly} {
		padding: 3em 0;
	}
`;

const FooterGrids = styled.div`
	float: left;
	width: 33.33%;
	padding: 0 0.5em;

	h4 {
		color: #767676;
		text-transform: uppercase;
		margin-bottom: 19px;
		font-size: 23px;
	}

	span {
		display: block;
	}

	${forSize.tabletLandscapeAndDown} {
		padding-left: 0;
		margin-top: 10px;
	}
`;

const FooterNav = styled.ul`
	list-style: none;
	font-size: 17px;
	line-height: 31px;
`;

const CopyRight = styled.p`
	display: block;
	margin: 3em 0 0;
	padding: 2.5em 0 2em 0;
	border-top: 1px solid #aaa;

	text-align: center;
`;

export default function Footer() {
	return (
		<FooterContainer>
			<div className="container">
				<FooterGrids>
					<h4>Vize</h4>
					<FooterNav>
						<li>
							<Link to="/about">
								<T>common.footer.about_us</T>
							</Link>
						</li>
					</FooterNav>
				</FooterGrids>
				<FooterGrids>
					<h4>
						<T>common.footer.employers</T>
					</h4>
					<FooterNav>
						<li>
							<Link to="/register">
								<T>common.footer.create_free_account</T>
							</Link>
						</li>
					</FooterNav>
				</FooterGrids>
				<FooterGrids>
					<h4>
						<T>common.footer.social</T>
					</h4>
					<FooterNav>
						<li>
							<a href="https://www.linkedin.com/company/incentivizinggood">
								<img
									src="images/linkedin.png"
									alt="LinkedIn"
									width={50}
									height={50}
									style={{ maxWidth: 50 }}
								/>
							</a>
							<a href="https://www.facebook.com/incentivizinggood">
								<img
									src="images/facebook.png"
									alt="Facebook"
									width={50}
									height={50}
									style={{ maxWidth: 50 }}
								/>
							</a>
							<a href="https://www.twitter.com/vizeglobal">
								<img
									src="images/twitter.png"
									alt="Twitter"
									width={50}
									height={50}
									style={{ maxWidth: 50 }}
								/>
							</a>
							<a href="https://www.instagram.com/incentivandoelbien/">
								<img
									src="images/instagram.png"
									alt="Instagram"
									width={50}
									height={50}
									style={{ maxWidth: 50 }}
								/>
							</a>
						</li>
					</FooterNav>
				</FooterGrids>
				<div className="clearfix" />
				<CopyRight>
					Vize © 2019. <T>common.footer.all_rights_reserved</T>
				</CopyRight>
			</div>
		</FooterContainer>
	);
}
