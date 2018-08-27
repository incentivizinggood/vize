import React from "react";
import { Formik, Field, Form } from "formik";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();
const T = i18n.createComponent(t);

const initialValues = {
	senderName: "",
	senderAddr: "",
	message: "",
};

function onSubmit(values, actions) {
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
}

const innerForm = ({ errors, isSubmitting }) => (
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
);

/* A page where visitors can get information about Vize and this app.
 */
export default class ContactUs extends React.Component {
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
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				render={innerForm}
			/>
		);
	}
}
