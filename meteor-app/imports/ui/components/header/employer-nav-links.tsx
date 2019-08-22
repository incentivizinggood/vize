import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";

import { urlGenerators } from "imports/ui/pages";
import { translations } from "imports/ui/translations";

const T = translations.header;

function EmployerNavLinks(props) {
	let companyURL;
	if (props.user.companyId) {
		if (Meteor.isDevelopment) console.log(props.user.companyId);
		companyURL = urlGenerators.vizeProfileUrl(props.user.companyId);
	} else {
		companyURL = "/company/create";
	}

	return (
		<>
			<li>
				<Link
					to={{
						pathname: companyURL,
						state: {
							prevPath: location.pathname,
						},
					}}
					className="link-kumya "
				>
					<span>
						<T.my_company />
					</span>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: "/post-a-job",
						state: {
							prevPath: location.pathname,
						},
					}}
					className="link-kumya"
				>
					<span>
						<T.post_a_job />
					</span>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: "/employer-resources",
						state: {
							prevPath: location.pathname,
						},
					}}
					className="link-kumya"
				>
					<span>
						<T.resources />
					</span>
				</Link>
			</li>
		</>
	);
}

export default EmployerNavLinks;
