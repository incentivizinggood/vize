import React from "react";
import styled from "styled-components";

import { VoteButtonsComponent as MutationVoteButtons } from "imports/gen/graphql-operations";

import VoteButton, { VoteButtonProps } from "./vote-button";

const VoteDiv = styled.div`
	text-align: center;

	> * {
		display: block;
		/* Display the buttons in a row if the screen is small. */
		@media (max-width: 992px) {
			display: inline-block;
		}

		/* Have some space between the buttons. */
		margin: 10px 5px;
	}
`;

type VoteButtonsProps = {
	review: VoteButtonProps["review"];
};

/**
 * The vote buttons component. For casting votes on reviews.
 * This contains two buttons, the upvote button and the downvote button.
 */
export default function VoteButtons(props: VoteButtonsProps) {
	return (
		<MutationVoteButtons>
			{castVote => (
				<VoteDiv>
					<VoteButton
						isUpButton
						castVote={castVote}
						review={props.review}
					/>
					<VoteButton castVote={castVote} review={props.review} />
				</VoteDiv>
			)}
		</MutationVoteButtons>
	);
}
