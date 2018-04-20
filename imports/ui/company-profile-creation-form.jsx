import { React } from "react";
import { Mongo } from "meteor/mongo";
import { Companies } from "../api/data/companies.js";
import { Companies } from "../api/data/companies.js";
import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(['autoform']);

/*
	Getting weird syntax errors, need to see
	if this has to do with React vs Blaze.
*/
export default class CompanyCreateProfileForm extends React.Component {
	render() {
		<template name="insertCompanyProfileForm">
			{{#autoForm collection="Companies" id="insertCompanyProfileForm" type="insert"}}
			<div>
				<button type="submit" class="btn btn-primary">Create Profile</button>
				<button type="reset" class="btn btn-primary">Reset Form</button>
			</div>
			{{/autoForm}}
		</template>
	}
}
