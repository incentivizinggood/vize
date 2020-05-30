import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { forSize } from "src/responsive.js";
import { translations } from "src/translations";

const T = translations.header;

// This button is only displayed in the mobile navigation bar
const WriteReviewButton = styled(Link)`
	display: none !important;
	background-color: red;
	font-weight: bold;

	${forSize.desktopAndDown} {
		display: block !important;
		height: 55px;
		margin-top: -25px;
	}
`;

function WorkerNavLinks() {
	return (
		<>
			<li>
				<WriteReviewButton to="/write-review">
					<T.write_review />
				</WriteReviewButton>
			</li>
			<li>
				<Link to="/companies">
					<span>
						<T.companies />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/jobs">
					<span>
						<T.jobs />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/recursos">
					<span>
						<T.resources />
					</span>
				</Link>
			</li>
		</>
	);
}

export default WorkerNavLinks;
