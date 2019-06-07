import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

const T = i18n.createComponent();

export default function Footer() {
	return (
		<div className="footer">
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
				<div>
					<div className="container">
						<div className="col-md-12">
							<div className="footer-bottom" />
						</div>
					</div>
				</div>
				<div className="footer-copy">
					<p>
						Vize © 2019. <T>common.footer.all_rights_reserved</T>
					</p>
				</div>
			</div>
		</div>
	);
}
