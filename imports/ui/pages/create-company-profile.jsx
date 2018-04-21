import React from "react";
import { Mongo } from "meteor/mongo";
import { Companies } from "../../api/data/companies.js";
// import SimpleSchema from "simpl-schema";
// SimpleSchema.extendOptions(['autoform']);

export default class CompanyCreateProfileForm extends React.Component {
	render() {
		return (
			<div className="page create-company-profile">
				<h1>
					Hello world
				</h1>
			</div>
		);
	}
}
