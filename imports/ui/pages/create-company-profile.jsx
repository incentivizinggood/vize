//"standard" imports
import React from "react";
import { Mongo } from "meteor/mongo";
import { Companies } from "../../api/data/companies.js";

//so we can use Blaze packages
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

//autoform business
import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(['autoform']);

//now the interesting part...
import "./ccp_blaze_form.html";
Template.ccp_blaze_form.helpers({
	companyProfiles: Companies,
});

export default class CompanyCreateProfileForm extends React.Component {
	render() {
		return (
			<div className="page CompanyCreateProfileForm">
				<Blaze template="ccp_blaze_form" />
			</div>
		);
	}
}
