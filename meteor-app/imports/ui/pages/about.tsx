import React from "react";

import PageWrapper from "imports/ui/components/page-wrapper";
import ContactForm from "imports/ui/components/contact-form";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

class AboutPage extends React.Component {
	render() {
		return (
			<PageWrapper title="About">
				<div id="home" className="banner static-page-banner">
					<div className="banner-info">
						<div className="banner-text">
							<h1 className="text-center">
								<T.aboutUs.about />
							</h1>
						</div>
					</div>
				</div>

				<div className="about">
					<div className="container">
						<div className="col-md-12">
							<h1 className="text-center about-header">
								<T.aboutUs.the_problem />
							</h1>
							<h3 className="about-subheader">
								<T.aboutUs.noLeverage />
							</h3>
						</div>
						<div className="col-md-12 ">
							<div className="about-row">
								<p className="about-paragraph">
									<T.aboutUs.problem_text />
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
								<T.aboutUs.our_solution />
							</h1>

							<h3 className="about-subheader">
								<T.aboutUs.reviews_accountability />
							</h3>
						</div>
						<div className="col-md-12">
							<div>
								<p className="about-paragraph">
									<T.aboutUs.solution_text />{" "}
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
