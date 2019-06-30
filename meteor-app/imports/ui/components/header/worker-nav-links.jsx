import React from "react";
import { Link } from "react-router-dom";

import { translations } from "/imports/ui/translations/index.ts";

const T = translations.header;

function WorkerNavLinks() {
	return (
		<>
			<li>
				<Link to="/companies" className="link-kumya ">
					<span>
						<T.companies />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/jobs" className="link-kumya">
					<span>
						<T.jobs />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/worker-resources" className="link-kumya">
					<span>
						<T.resources />
					</span>
				</Link>
			</li>
		</>
	);
}

export default WorkerNavLinks;
