import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/ui/pages";

const T = i18n.createComponent();

function EmployerNavLinks(props) {
	let companyURL;
	if (props.user.companyId) {
		if (Meteor.isDevelopment) console.log(props.user.companyId);
		companyURL = urlGenerators.vizeProfileUrl(props.user.companyId);
	} else {
		companyURL = "/create-company-profile";
	}

	return (
		<>
			<li>
				<Link to={companyURL} className="link-kumya ">
					<span>
						<T>common.header.my_company</T>
					</span>
				</Link>
			</li>
			<li>
				<Link to="/post-a-job" className="link-kumya">
					<span>
						<T>common.header.post_a_job</T>
					</span>
				</Link>
			</li>
			<li>
				<Link to="/employer-resources" className="link-kumya">
					<span>
						<T>common.header.resources</T>
					</span>
				</Link>
			</li>
		</>
	);
}

export default EmployerNavLinks;
