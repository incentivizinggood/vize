import React from "react";
import { Link } from "react-router-dom";

import { translations } from "imports/ui/translations";

const T = translations.header;

function WorkerNavLinks() {
	return (
		<>
			<li>
				<Link
					to={{
						pathname: "/companies",
						state: {
							prevPath: location.pathname,
						},
					}}
					className="link-kumya "
				>
					<span>
						<T.companies />
					</span>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: "/jobs",
						state: {
							prevPath: location.pathname,
						},
					}}
					className="link-kumya"
				>
					<span>
						<T.jobs />
					</span>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: "/worker-resources",
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

export default WorkerNavLinks;
