import React from "react";
import styled from "styled-components";
import { colors, borderRadius } from "src/global-styles";

const StyledStats = styled.div`
	background: #eff6fa;
	border-radius: ${borderRadius.container};
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50%;
	margin-bottom: 10px;
	borded: 1px solid #efefef;
	div {
		width: 200px;
		text-align: center;
	}
`;
const StatesTitle = styled.div`
	color: ${colors.primaryColorBlue};
	font-size: 36px;
	font-weight: 900;
`;
interface StatsProps {
    value: string;
    text: string;
}
export default function Stats(props: StatsProps): JSX.Element {
    const { value, text } = props;
    return <StyledStats>
        <div>
            <StatesTitle>{value}</StatesTitle>
            <span>
                {text}
            </span>
        </div>
    </StyledStats>
}