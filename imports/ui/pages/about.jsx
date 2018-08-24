import React from "react";
import { Formik, Field, Form } from "formik";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header.jsx";
import Footer from "/imports/ui/components/footer.jsx";

const t = i18n.createTranslator();
const T = i18n.createComponent(t);

const formikProps = {
	initialValues: {
		senderName: "",
		senderAddr: "",
		message: "",
	},
	onSubmit: (values, actions) => {
		Meteor.call(
			"sendEmail",
			"incentivizinggood@gmail.com",
			"postmaster@incentivizinggood.com",
			`Contacting us: ${values.senderName}`,
			`Howdy Vize reader,\nBelow is the message: \n${
				values.message
			}.\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: ${
				values.senderAddr
			}`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					alert("Please try again");
					console.log(err);
					console.log("--- END error");
					actions.setSubmitting(false);
					// TODO: Send errors from api and display to user.
					// actions.setErrors(transformMyAPIErrorToAnObject(error));
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
					alert("Thank you for the feedback!");
					actions.setSubmitting(false);
				}
			}
		);
	},
	render: ({ errors, touched, isSubmitting }) => (
		<Form>
			<span className="contact100-form-title">
				<T>common.aboutUs.reach_us</T>
			</span>
			<div className="wrap-input100 rs1 validate-input">
				<Field
					type="text"
					name="senderName"
					id="first-name"
					className="input100"
					placeholder={t("common.aboutUs.placeholder_name")}
				/>
				<span className="focus-input100" />
			</div>
			<div className="wrap-input100 rs1 validate-input">
				<Field
					type="text"
					name="senderAddr"
					id="email"
					className="input100"
					placeholder={t("common.aboutUs.placeholder_email")}
				/>
				<span className="focus-input100" />
			</div>
			<div className="wrap-input100 validate-input">
				<Field
					type="text"
					name="message"
					component="textarea"
					id="message"
					className="input100"
					placeholder={t("common.aboutUs.placeholder_comments")}
				/>
				<span className="focus-input100" />
			</div>
			<div className="container-contact100-form-btn">
				<button
					type="submit"
					disabled={isSubmitting}
					className="contact100-form-btn"
				>
					<span>
						<T>common.aboutUs.submit_button</T>
						<i className="zmdi zmdi-arrow-right m-l-8" />
					</span>
				</button>
			</div>
		</Form>
	),
};

/* A page where visitors can get information about Vize and this app.
 */
export default class AboutPage extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
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
								<Formik {...formikProps} />
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
