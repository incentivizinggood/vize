import React from "react";
import { Link } from "react-router-dom";

import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";

const T = translations.header;

interface EmployerNavLinksProps {
	user: {
		company?: { id: string } | null;
	};
}

function EmployerNavLinks(props: EmployerNavLinksProps) {
	let companyURL;
	if (props.user.company) {
		companyURL = urlGenerators.vizeCompanyProfileUrl(props.user.company.id);
	} else {
		companyURL = `/${urlGenerators.queryRoutes.createCompanyProfile}`;
	}

	return (
		<>
			<li>
				<Link to={companyURL} className="link-kumya ">
					<span>
						<T.my_company />
					</span>
				</Link>
			</li>
			<li>
				<Link to={`/${urlGenerators.queryRoutes.postJob}`} className="link-kumya">
					<span>
						<T.post_a_job />
					</span>
				</Link>
			</li>
			<li>
				<Link to={`/${urlGenerators.queryRoutes.workerResources}`} className="link-kumya">
					<span>
						<T.resources />
					</span>
				</Link>
			</li>
		</>
	);
}

export default EmployerNavLinks;
