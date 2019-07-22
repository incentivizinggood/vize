import React from "react";

import { Meteor } from "meteor/meteor";
import { i18n } from "meteor/universe:i18n";

import PageWrapper from "imports/ui/components/page-wrapper";
import ContactForm from "imports/ui/components/contact-form";

/* A page where visitors can get information about Vize and this app.
 */

const T = i18n.createComponent();

class AboutPage extends React.Component {
	render() {
		return (
			<PageWrapper title="About">
				<div id="home" className="banner static-page-banner">
					<div className="banner-info">
						<div className="banner-text">
							<h1 className="text-center">
								<T>common.aboutUs.about</T>
							</h1>
						</div>
					</div>
				</div>

				<div className="about">
					<div className="container">
						<div className="col-md-12">
							<h1 className="text-center about-header">
								<T>common.aboutUs.the_problem</T>
							</h1>
							<h3 className="about-subheader">
								<T>common.aboutUs.noLeverage</T>
							</h3>
						</div>
						<div className="col-md-12 ">
							<div className="about-row">
								<p className="about-paragraph">
									<T>common.aboutUs.problem_text</T>
								</p>
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</div>

				<div className="about contrast">
					<div className="container">
						<div className="col-md-12">
							<h1 className="text-center about-header">
								<T>common.aboutUs.our_solution</T>
							</h1>

							<h3 className="about-subheader">
								<T>common.aboutUs.reviews_accountability</T>
							</h3>
						</div>
						<div className="col-md-12">
							<div>
								<p className="about-paragraph">
									<T>common.aboutUs.solution_text</T>{" "}
								</p>
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</div>

				<div className="cont">
					<div className="container">
						<div className="container-contact">
							<ContactForm />
						</div>
					</div>
				</div>
			</PageWrapper>
		);
	}
}

export default AboutPage;
