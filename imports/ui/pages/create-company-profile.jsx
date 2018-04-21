//"standard" imports
import React from "react";
import { Mongo } from "meteor/mongo";
import { Companies } from "../../api/data/companies.js";
import { withTracker } from 'meteor/react-meteor-data';

//Methinks that I'm not able to use methods in the form
//unless I have this NEAT little import, perhaps load order
//has something to do with it...
import "../../api/data/methods.js";

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

//TESTING ONLY
//so I can write code that uses the Collection,
//before seeing whether the form works
import { Factory } from 'meteor/dburles:factory';
const faker = require('faker');
faker.seed(42);
Factory.define("companyProfile", Companies, {
	name: faker.company.companyName(),
	dateEstablished: faker.date.recent(),
	dateJoined: faker.date.recent(),
	numEmployees: 1,
	industry: faker.commerce.product(),
	locations: faker.address.streetAddress(),
	contantInfo: faker.lorem.sentence(),
	email: faker.internet.email(),
	numFlags: 0,
	aveSafety: 0,
	avgRespect: 0,
	avgBenefits: 0,
	avgSatisfaction: 0,
	numReviews: 0,
});
Tracker.autorun(() => {
	Meteor.subscribe('CompanyProfiles');
});

class CompanyCreateProfileForm extends React.Component {
	constructor(props) {
		super(props);
	}

	//TESTING CODE
	renderCompanyProfiles() {
		console.log("How do I shot web!?!?");
		return this.props.companyProfiles.map((companyProfile) => (
			<div>
				<p>Company</p>
				<p>Name: {companyProfile.name}</p>
				<p>Email: {companyProfile.email}</p>
			</div>
		));
	}

	render() {
		return (
			<div className="page CompanyCreateProfileForm">
				<Blaze template="ccp_blaze_form" />
				{this.renderCompanyProfiles()}
			</div>
		);
	}
}

export default withTracker(() => {
	return {
		companyProfiles: Companies.find({}).fetch(),
	};
})(CompanyCreateProfileForm);
