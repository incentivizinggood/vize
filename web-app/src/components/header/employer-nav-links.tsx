import React from "react";
import { Link } from "react-router-dom";

import { urlGenerators } from "src/pages/url-generators";
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
		companyURL = urlGenerators.vizeProfileUrl(props.user.company.id);
	} else {
		companyURL = "/company/create";
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
				<Link to="/post-a-job" className="link-kumya">
					<span>
						<T.post_a_job />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/recursos" className="link-kumya">
					<span>
						<T.resources />
					</span>
				</Link>
			</li>
		</>
	);
}

export default EmployerNavLinks;
