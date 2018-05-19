//Boilerplate first
import React from "react";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
let formError = new ReactiveVar("good");

//Specific stuff second
import { Companies } from "../../api/data/companies.js";
import "./ccp_blaze_form.html";

Template.ccp_blaze_form.helpers({
    companyProfiles: Companies,
    ErrorWidget: function() {
        /*
			This is a good place to talk about the little error blurb
			you see at the bottom of this form. I realize that it's
			redundant with most of AutoForm's auto-validation.
			However, it offers many advantages:
			1) It reflects the *method* errors, not auto-validation errors
			2) It therefore catches some things, like not-logged-in, that
				auto-validation can't/shouldn't
			3) It may be helpful to see errors in two places, especially
				if one place is fixed at the bottom of the form
			4) It is immensely useful in testing, because it tends to reflect state
		*/
        return ErrorWidget;
    },
    hasError: function() {
        return formError.get() !== "good";
    },
    error: function() {
        return formError.get();
    },
    resetFormError: function() {
        //called when reset button is clicked
        formError.set("good");
    },
});

AutoForm.addHooks("ccp_blaze_form", {
    onSuccess: function(formType, result) {
        // If your method returns something, it will show up in "result"
        if (Meteor.isDevelopment)
            console.log(
                "SUCCESS: We did a thing in a " + formType + " form: " + result
            );
        formError.set("good");
    },
    onError: function(formType, error) {
        // "error" contains whatever error object was thrown
        if (Meteor.isDevelopment)
            console.log(
                "ERROR: We did a thing in a " + formType + " form: " + error
            );
        formError.set(error.toString());
    },
});

export default class CompanyCreateProfileForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page CompanyCreateProfileForm">
                <Blaze template="ccp_blaze_form" />
            </div>
        );
    }
}
