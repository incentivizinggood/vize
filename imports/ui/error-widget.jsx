import React from "react";
import PropTypes from "prop-types";

export default class ErrorWidget extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		/*
			BUG
			I have noticed that the text displayed by this component
			does not get reactively translated when you change locale.
			This is because the translation occurs higher up the stack,
			you notice that this component doesn't even invoke i18n, it
			merely displays its prop, which in every case has already been
			translated.
			QUESTION
			So how could we fix this? One way would be to pass in actual
			errors, and parse and translate them accordingly inside the
			component. This works fine for errors thrown by methods, where
			we have complete control over the format (usually Meteor.Error),
			and can pass in all the needed information, but not with AutoForm
			validation errors, which cannot be customized and are always
			pre-translated.
			Why is the fact that there are two cases a problem? Because they
			are both reached from the onError hook, which has no control over
			the error argument that it receives, so we can fix one case but
			not really the other.
			There might be an acceptable workaround in only displaying this
			widget when a Meteor Error is thrown, and assuming that the other
			errors will be reflected on the form. Hopefully this could also
			have the effect of moving i18n out of the methods.
			An improvement on that workaround would be to display a message
			regardless, but not attempt to translate AutoForm errors, but
			instead display a single message (which we would have the freedom
			to translate) for all AutoForm errors telling the user to look
			over the form, which still reflects the intention of the widget
			without introducing the randomness of "will it be there or not".
			NOTE
			That is the solution I will go with for now:
			- Move i18n out of the methods and into this component
			- Add a switch to the onError hooks to handle AutoForm errors
				and Meteor errors slightly differently
			- Display full error messages for Meteor errors,
				and display "partial" error messages for AutoForm errors
		*/
		return (
			<div className="alert alert-danger">
				<strong>{this.props.err}</strong>
			</div>
		);
	}
}

ErrorWidget.propTypes = {
	err: PropTypes.string.isRequired,
};
