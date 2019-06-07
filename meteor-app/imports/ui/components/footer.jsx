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
	padding-top: 5%;
	padding-bottom: 0;
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

	.footer-grids {
		h4 {
			color: #767676;
			text-transform: uppercase;
			margin-bottom: 19px;
			font-size: 23px;
		}

		&:nth-child(1) {
			padding: 0 5em 0 0;
		}

		span {
			display: block;
		}
	}

	ul.footer_nav {
		list-style-type: none;
	}

	ul.footer_nav {
		.navigation4,
		.navigation3,
		.navigation2,
		.navigation1 {
			font-size: 17px;
			list-style: none;
			line-height: 31px;
		}
	}

	/* From sass/responsive/_desktop-and-down.scss */
	${forSize.desktopAndDown} {
		padding: 4em 0;

		.footer-grids {
			float: left;
			width: 33.33%;
			padding: 0 0.5em;

			&:nth-child(1) {
				padding: 0 1em 0 0;
			}

			&:nth-child(2) {
				margin: 1em 0;
			}
		}

		img {
			padding: 0;
			width: 100%;
		}
	}

	/* From sass/responsive/_tablet-landscape-and-down.scss */
	${forSize.tabletLandscapeAndDown} {
		padding: 5em 0;

		.footer-grids {
			padding-left: 0;
			margin-top: 10px;
		}
	}

	/* From sass/responsive/_phones-only.scss */
	${forSize.phoneOnly} {
		padding: 3em 0;
	}
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
				<div className="col-md-3 footer-grids">
					<h4>Vize</h4>
					<ul className=" footer_nav navigation1 ">
						<li>
							<Link to="/about">
								<T>common.footer.about_us</T>
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-md-3 footer-grids">
					<h4>
						<T>common.footer.employers</T>
					</h4>
					<ul className=" footer_nav navigation2">
						<li>
							<Link to="/register">
								<T>common.footer.create_free_account</T>
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-md-3 footer-grids">
					<h4>
						<T>common.footer.social</T>
					</h4>
					<ul className=" footer_nav navigation3">
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
					</ul>
				</div>
				<div className="clearfix" />
				<CopyRight>
					Vize © 2019. <T>common.footer.all_rights_reserved</T>
				</CopyRight>
			</div>
		</FooterContainer>
	);
}
