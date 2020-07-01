import React from "react";
import styled from "styled-components";
import { forSize } from "src/responsive";
import FullWidthLineDivider from "./full-width-line-divider";

import { Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const SeeMoreFooterContainer = styled.div`
	display: flex;
	justify-content: center;

	padding: 13px;
	font-weight: bold;

	> * {
		display: flex;
		justify-content: center;
	}

	${forSize.phoneOnly} {
		padding: 10px;
	}
`;

type SeeMoreFooterProps = {
	to: string;
	ariaControls: string;
	children: React.ReactNode;
};

function SeeMoreFooter(props: SeeMoreFooterProps) {
	return (
		<>
			<FullWidthLineDivider />
			<SeeMoreFooterContainer>
				<Link
					to={props.to}
					aria-controls={props.ariaControls}
					role="tab"
					data-toggle="tab"
				>
					{props.children}
					<ChevronRightIcon />
				</Link>
			</SeeMoreFooterContainer>
		</>
	);
}

export default SeeMoreFooter;
