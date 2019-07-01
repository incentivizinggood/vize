import React from "react";

import { i18n } from "meteor/universe:i18n";

const T = i18n.createComponent();

export default function ContactTab() {
	return (
		<div role="tabpanel" className="tab-pane" id="contact">
			<div className="col-md-12  section_rview_back_color ">
				<div className="sect-padding ">
					<h4 className="head_section_font">
						<T>common.companyprofile.contact</T>
					</h4>
					<hr />

					<div className="container-contact">
						<div className="wrap-contact">
							<form className="contact-form validate-form">
								<span className="contact-form-title">
									<T>common.companyprofile.feel_free</T>
									<T>common.companyprofile.reach_us</T>
								</span>
								<div className="wrap-input rs1 validate-input">
									<input
										id="first-name"
										className="input"
										type="text"
										name="first-name"
										placeholder="Your Name"
									/>
									<span className="focus-input" />
								</div>
								<div className="wrap-input rs1 validate-input">
									<input
										id="email"
										className="input"
										type="text"
										name="email"
										placeholder="Eg. example@email.com"
									/>
									<span className="focus-input" />
								</div>
								<div className="wrap-input validate-input">
									<textarea
										id="message"
										className="input"
										name="message"
										placeholder="Please enter your comments..."
									/>
									<span className="focus-input" />
								</div>
								<div className="container-contact-form-btn">
									<button className="contact-form-btn">
										<span>
											Submit
											<i className="zmdi zmdi-arrow-right m-l-8" />
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="clear" />
			</div>
		</div>
	);
}
