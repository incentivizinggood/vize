
import React from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";
interface ButtonOutlineProps {
    to:any,
    class:string
}
export const BannerTitle = styled.Link`
	border-radius:6px;
    border:1px solid #192552;
`;
function ButtonOutline(props: ButtonOutlineProps): JSX.Element{
    return <Link {...props}></Link>
}
export default ButtonOutline