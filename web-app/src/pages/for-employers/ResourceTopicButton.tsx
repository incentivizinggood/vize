import React from "react";
import { forSize } from "src/responsive";
import styled from "styled-components";
const TopicItem = styled.button`
    width:250px;
    background:white;
    border-radius: 30px;
    margin: 0 15px;
    margin-bottom: 5px;
    padding: 15px 5px;
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
            text-align:left;
        }
    }
`;
interface ResourceTopicButtonProps {
    title: string,
    img?: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function ResourceTopicButton(props: ResourceTopicButtonProps): JSX.Element {
    const { title, img, onClick } = props
    return <TopicItem onClick={onClick}>
        <div>
            {img ? <img src={img} alt=""></img> : null}
        </div>
        <span>{title}</span>
    </TopicItem>
}