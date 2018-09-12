import React from "react";

import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import ContactUs from "/imports/ui/forms/contact-us.jsx";

const T = i18n.createComponent();

/* A page where visitors can get information about Vize and this app.
 */
export default function AboutPage() {
	return (
		<div>
			<Header />
			<div id="home" className="banner about-banner">
				<div className="banner-info">
					<div className="banner-text">
						<h1>
							<T>common.aboutUs.about</T>
						</h1>
					</div>
				</div>
			</div>

			<div className="about">
				<div className="container">
					<div className="col-md-12">
						<h1 className="al">
							<T>common.aboutUs.the_problem</T>
						</h1>
						<h3 className="emplh3">
							<T>common.aboutUs.noLeverage</T>
						</h3>
					</div>
					<div className="col-md-12 ">
						<div className="about-row">
							<p>
								<T>common.aboutUs.problem_text</T>
							</p>
						</div>
						<div className="clearfix" />
					</div>
				</div>
			</div>

			<div className="about  bl">
				<div className="container">
					<div className="col-md-12  cdoun">
						<h1 className="al">
							<T>common.aboutUs.our_solution</T>
						</h1>

						<h3 className="emplh3">
							<T>common.aboutUs.reviews_accountability</T>
						</h3>
					</div>
					<div className="col-md-12 ">
						<div className="about-row">
							<p>
								<T>common.aboutUs.solution_text</T>{" "}
							</p>
						</div>
						<div className="clearfix" />
					</div>
				</div>
			</div>

			<div className="cont about-cont">
				<div className="container">
					<div className="container-contact100">
						<div className="wrap-contact100">
							<ContactUs />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
