import React from "react";
import { forSize } from "src/responsive";
import styled from "styled-components";
const TopicItem = styled.div`
    width:250px;
    background:#fff;
    border-radius:16px;
    margin:0 15px;
    margin-bottom:5px;
    padding:5px;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        justify-content: flex-end;
        float:right;
        margin-right:10px;
        ${forSize.tabletAndDown} {
            width:30%;
        }
    }
    span{
        
        flex : 0 0 auto;
        font-weight:600;
        ${forSize.tabletAndDown} {
            width:70%;
        }
    }
`;
interface ResourceopicButtonProps {
    title: string,
    img?: string
}
export default function ResourceopicButton(props: ResourceopicButtonProps): JSX.Element {
    const { title, img } = props
    return <TopicItem>
        <div>
            {img ? <img src={img} alt=""></img> : null}
        </div>
        <span>{title}</span>
    </TopicItem>
}