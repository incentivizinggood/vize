import React from "react";

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
							<a href="/about">
								<T>common.footer.about_us</T>
							</a>
						</li>
					</ul>
				</div>
				<div className="col-md-3 footer-grids">
					<h4>
						<T>common.footer.employers</T>
					</h4>
					<ul className=" footer_nav navigation2">
						<li>
							<a href="/register">
								<T>common.footer.create_free_account</T>
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
						Vize © 2018. <T>common.footer.all_rights_reserved</T>
					</p>
				</div>
			</div>
		</div>
	);
}