import React from "react";
import PageWrapper from "src/components/page-wrapper";
import faker from "faker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

function Experiance() {
	return (
		<li>
			{faker.date.past().toLocaleDateString()} to{" "}
			{faker.date.past().toLocaleDateString()} <br />
			{faker.company.companyName()} <br />
			{faker.name.jobTitle()}
		</li>
	);
}

export function UserProfilePage(): React.ReactElement<any, any> | null {
	faker.locale = "es_MX";
	const displayName = faker.name.findName();

	return (
		<PageWrapper title={displayName}>
			<div style={{ height: 68 + 7 }} />
			<h1>{displayName}</h1>

			<h2>
				<FontAwesomeIcon icon={faMapMarker} /> {faker.address.city()},{" "}
				{faker.address.state()}
			</h2>
			<h2>{faker.name.jobTitle()}</h2>

			<h4>5-year goal</h4>
			<p>{faker.lorem.paragraph(2)}</p>

			<ul>
				<Experiance />
				<Experiance />
				<Experiance />
			</ul>
		</PageWrapper>
	);
}
