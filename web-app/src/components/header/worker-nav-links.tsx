import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { forSize } from "src/responsive";
import { translations } from "src/translations";

import * as urlGenerators from "src/pages/url-generators";

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
				<WriteReviewButton to={urlGenerators.queryRoutes.writeReview}>
					<T.write_review />
				</WriteReviewButton>
			</li>
			<li>
				<Link to="/empresas">
					<span>
						<T.companies />
					</span>
				</Link>
			</li>
			<li>
				<Link to="/trabajos">
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
