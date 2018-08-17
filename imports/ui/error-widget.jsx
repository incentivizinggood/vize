import React from "react";
import PropTypes from "prop-types";
import i18n from "meteor/universe:i18n";

export default class ErrorWidget extends React.Component {
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

	constructor(props) {
		super(props);
		this.renderMessage = this.renderMessage.bind(this);
	}

	renderMessage() {
		// cases:
		// - does not have error -> do not render
		// - has SQL error -> render but do not translate
		// - else has normal error -> render and translate
		if (!this.props.err.hasError) {
			// dunno if this should say something more to
			// the effect of "nothing to report", but this
			// will do for now
			return <div>ERROR you should never see this message</div>;
		} else if (this.props.err.isSqlError) {
			return (
				<div>
					{i18n.__("common.forms.error")}: {this.props.err.reason} [{
						this.props.err.error
					}]
				</div>
			);
		} else {
			return (
				<div>
					{i18n.__("common.forms.error")}:{" "}
					{i18n.__(
						`common.methods.errorMessages.${this.props.err.reason}`
					)}{" "}
					[{i18n.__(
						`common.methods.meteorErrors.${this.props.err.error}`
					)}]
				</div>
			);
		}
	}

	render() {
		return (
			<div className="alert alert-danger">
				<strong>{this.renderMessage()}</strong>
			</div>
		);
	}
}

ErrorWidget.propTypes = {
	err: PropTypes.shape({
		hasError: PropTypes.bool.isRequired,
		reason: PropTypes.string,
		error: PropTypes.string,
		details: PropTypes.object,
		isSqlError: PropTypes.bool.isRequired,
	}).isRequired,
};
