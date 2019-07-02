import React from "react";
import { Link } from "react-router-dom";

import { i18n } from "meteor/universe:i18n";

const T = i18n.createComponent();

function WorkerNavLinks() {
	return (
		<>
			<li>
				<Link to="/companies" className="link-kumya ">
					<span>
						<T>common.header.companies</T>
					</span>
				</Link>
			</li>
			<li>
				<Link to="/jobs" className="link-kumya">
					<span>
						<T>common.header.jobs</T>
					</span>
				</Link>
			</li>
			<li>
				<Link to="/worker-resources" className="link-kumya">
					<span>
						<T>common.header.resources</T>
					</span>
				</Link>
			</li>
		</>
	);
}

export default WorkerNavLinks;
