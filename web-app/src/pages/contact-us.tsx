import React from "react";

import { Meteor } from "meteor/meteor";

import PageWrapper from "src/components/page-wrapper";
import ContactForm from "src/components/contact-form";
import { translations } from "src/translations";

const T = translations.footer;

/* A page where visitors can contact Vize for buisness inqueries.
 * Help and support contact may be handled here as well,
 * but users should be directed to the HelpPage first.
 */
export default class ContactUsPage extends React.Component {
	render() {
		return (
			<PageWrapper title="Contact Us">
				<div id="home" className="banner static-page-banner">
					<div className="banner-info">
						<div className="banner-text">
							<h1 className="text-center">
								<T.contactUs />
							</h1>
						</div>
					</div>
				</div>
				<div className="background-white">
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
