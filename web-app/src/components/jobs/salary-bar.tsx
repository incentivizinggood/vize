import React from "react";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { forSize } from "src/responsive";

const SalaryBarWrapper = styled.div`
    width:1000px;
    display:flex;
    align-items:center;
    height:75px;
    position:relative;
    margin:0 auto;
    ${forSize.tabletAndDown} {
        width:310px;
    }
    ${forSize.phoneOnly} {
        width:237px;
    }
`;
const DottedRow = styled.hr`
    height:14px;
    overflow:hidden;
    // border-top: 1px solid ${colors.primaryColorBlue} !important;
    border:none;
    :after {
        content:"..............................................................................................................................";
        color:${colors.primaryColorBlue};
        letter-spacing: 4px; 
    }
    ${forSize.tabletAndDown} {
        :after {
            content:"....................................";
        }
    }
    ${forSize.phoneOnly} {
        :after {
            content:".........................";
        }
    }
`;
const MarkedCircle = styled.div`
    position: absolute;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    top: 28px;
    display:flex;
    align-items:center;
    justify-content: center;
    ${(props: any) => {
        if (props.position === "start") {
            return `left:0;`;
        } else if (props.position === "end") {
            return `right:0;`;
        } else {
            return `left:${props.position}px;`;
        }
    }}
    background: ${colors.primaryColorBlue};
    :before{
        content: "${(props: any) => {
        return `$${props.value}`
    }}";
        position: absolute;
        top: -25px;
        text-align: center;
    }
    :after{
        content: ${(props: any) => {
        if (props.position === "start") {
            return `"Min"`;
        } else if (props.position === "end") {
            return `"Max"`;
        } else {
            return `"Average"`;
        }
    }};;
        position: absolute;
        bottom: -25px;
        text-align: center;
    }
`;
const InnerCircle = styled.div`
    background: white;
    height: 10px;
    width: 10px;
    border-radius: 50%;
`;
export default function SalaryBar(props: any): JSX.Element {
    const { range } = props;
    let averagePosition = (range[1] * 975) / range[2];
    if (range[1] === range[0]) {
        averagePosition = 0;
    }
    return <SalaryBarWrapper>
        <DottedRow></DottedRow>
        <MarkedCircle position="start" value={range[0]}>
            <InnerCircle></InnerCircle>
        </MarkedCircle>
        <MarkedCircle position={averagePosition.toString()} value={range[1]}>
            <InnerCircle></InnerCircle>
        </MarkedCircle>
        <MarkedCircle position="end" value={range[2]}>
            <InnerCircle></InnerCircle>
        </MarkedCircle>
    </SalaryBarWrapper>
}