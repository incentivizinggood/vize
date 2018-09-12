import React from "react";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

const T = i18n.createComponent();

function linksForUser(user) {
	if (user) {
		if (user.role === "company") {
			let companyURL;
			if (user.companyId) {
				if (Meteor.isDevelopment) console.log(user.companyId);
				companyURL = urlGenerators.vizeProfileUrl(user.companyId);
			} else {
				companyURL = "/create-company-profile";
			}
			return [
				{
					href: companyURL,
					Text: () => "My Company",
				},
				{
					href: "/post-a-job",
					Text: () => "Post a Job",
				},
				{
					href: "/employer-resources",
					Text: () => "Resources",
				},
			];
		}
		if (user.role === "worker") {
			return [
				{
					href: "/companies",
					Text: () => <T>common.header.companies</T>,
				},
				{
					href: "/jobs",
					Text: () => <T>common.header.jobs</T>,
				},
				{
					href: "/worker-resources",
					Text: () => <T>common.header.resources</T>,
				},
			];
		}
	}
	return [
		{
			href: "/companies",
			Text: () => <T>common.header.companies</T>,
		},
		{
			href: "/jobs",
			Text: () => <T>common.header.jobs</T>,
		},
		{
			href: "/worker-resources",
			Text: () => <T>common.header.resources</T>,
		},
	];
}

export default function Links(props) {
	return linksForUser(props.user).map(({ href, Text }) => (
		<li key={href}>
			<a href={href} className="link-kumya ">
				<span>
					<Text />
				</span>
			</a>
		</li>
	));
}
