import React from "react";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import { If, Then, Else } from "/imports/ui/if-else.jsx";
import LangSelector from "./lang-selector.jsx";
import Links from "./links.jsx";

const T = i18n.createComponent();

export default function NavBar(props) {
	const navbarLeft = (
		<ul className="nav navbar-nav left_nav">
			<Links user={props.user} />
		</ul>
	);

	const navbarRight = (
		<ul className="nav navbar-nav navbar-right">
			<If cond={props.user}>
				<Then>
					<li className="navigation-only-display dropdown pf  show-on-hover-pf">
						<a
							href="#"
							className="dropdown-toggle  "
							data-toggle="dropdown"
						>
							<img
								src="images/profileIcon.png"
								className="img-responsive  dp-profile"
							/>{" "}
						</a>
						<ul className="dropdown-menu pf">
							<li className="tr">
								<a
									href="/my-account"
									className="btn navbar-btn margin-right btn-green hvr-icon-forward"
								>
									{i18n.__("common.header.myaccount")}
								</a>
							</li>
							<li className="tr">
								<a
									onClick={Meteor.logout}
									className="navbar-link margin-right"
									style={{
										cursor: "pointer",
									}}
								>
									<T>common.header.logout</T>
								</a>
							</li>
						</ul>
					</li>
				</Then>
				<Else>
					<li>
						<a
							href="/register"
							type="button"
							id="register-button"
							className="btn navbar-btn margin-right btn-green hvr-icon-forward"
						>
							{i18n.__("common.header.signup")}
						</a>
					</li>
					<li>
						<a href="/login" className="navbar-link margin-right">
							<T>common.header.login</T>
						</a>
					</li>
				</Else>
			</If>

			<li className="dropdown">
				<LangSelector />
			</li>
			<li>
				<a href="/foremployers" className="link-kumya">
					<span>
						<T>common.header.for_employers</T>
					</span>
				</a>
			</li>
		</ul>
	);

	return (
		<div className="top-nav">
			<nav>
				<div className="container">
					<div className="navbar-header logo">
						<h2 className="site-logo">
							<a href="/">
								<img src="/images/logo.png" />
							</a>
						</h2>
					</div>
					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						{navbarLeft}
						{navbarRight}
						<div className="clearfix" />
					</div>
				</div>
			</nav>
		</div>
	);
}