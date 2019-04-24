import React from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import voteButtonsQuery from "./vote-buttons.graphql";
import VoteButton from "./vote-button.jsx";

const VoteDiv = styled.div`
	> :first-child {
		/* Have some space between the buttons. */
		margin-bottom: 20px;
	}

	@media (max-width: 768px) {
		text-align: center;
	}
`;

/**
 * The vote buttons component. For casting votes on reviews.
 * This contains two buttons, the upvote button and the downvote button.
 */
export default function VoteButtons(props) {
	return (
		<Mutation mutation={voteButtonsQuery}>
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
		</Mutation>
	);
}
